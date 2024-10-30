const { UserModel, BookModel } = require('../models/index');

exports.getAllUsers = async(req, res) => {
    const users = await UserModel.find();

    if(users.length == 0)
    {
        return res.status(404).json({
            success: false,
            message: "No User Found",
        })
    }
    return res.status(200).json({
        success: true,
        data: users,
    })
}

exports.getSingleUserById = async(req, res) => {
    const { id } = req.params;

    const user = await UserModel.findById(id);

    if(!user)
    {
        return res.status(404).json({
            success: false,
            message: "User Doesn't Exist.",
        });
    }
     return res.status(200).json({
        success: true,
        message: "User Found.",
        data: user,
    });
}

exports.createNewUser = async(req, res) => {
    const {id, name, surname, email, subscriptionType, subscriptionDate} = req.body

    await UserModel.create({
        id,
        name,
        surname,
        email,
        subscriptionType,
        subscriptionDate,
    });

    const users = await UserModel.find();

    return res.status(201).json({
        success: true,
        message: "User Added Successfully",
        data: users,
    })
}

exports.updateUserData = async(req, res) => {
    const {id} = req.params;
    const {data} = req.body;

    const updatedUser = await UserModel.findOneAndUpdate({
        _id: id,
    },
    {
        $set: {
            ...data, //* Can write only data too same as the updateBook method, this is just another approach for it
        }
    }, 
    {
        new: true,
    })
    res.status(200).json({
        success: true,
        message: "User Updated",
        data: updatedUser,
    })
}

exports.deleteUser = async(req, res) => {
    const { id } = req.params;
    
    const deletedUser = await UserModel.deleteOne({_id: id});
    const users = await UserModel.find();

    if(!deletedUser)
    {
        return res.status(404).json({
            success: false,
            message: "User Doesn't Exist.",
        });
    }
    return res.status(200).json({
        success: true,
        message: "User Deleted.",
        data: users,
    })
}

exports.getSubscriptionDetailsById = async (req, res) => {
    const { id } = req.params;
    const user = await UserModel.findById(id).lean(); //* Convert to plain JS object for better handling

    if (!user) {
        return res.status(400).json({
            success: false,
            message: "User with this ID does not exist.",
        });
    }

    const getDateInDays = (data = "") => {
        let date = data ? new Date(data) : new Date();
        return Math.floor(date / (1000 * 60 * 60 * 24)); // Days since Jan 1, 1970 UTC
    };

    const subscriptionType = (subscriptionDate) => {
        if (user.subscriptionType === "Basic") return subscriptionDate + 90;
        if (user.subscriptionType === "Standard") return subscriptionDate + 180;
        if (user.subscriptionType === "Premium") return subscriptionDate + 365;
    };

    const returnDate = getDateInDays(user.returnDate);
    const currentDate = getDateInDays();
    const subscriptionDate = getDateInDays(user.subscriptionDate);
    const subscriptionExpiration = subscriptionType(subscriptionDate);

    const data = {
        ...user,
        isSubscriptionExpired: subscriptionExpiration <= currentDate,
        daysLeftForExpiration: subscriptionExpiration <= currentDate ? 0 : subscriptionExpiration - currentDate,
        fine: returnDate < currentDate ? (subscriptionExpiration <= currentDate ? 100 : 50) : 0,
    };

    return res.status(200).json({
        success: true,
        message: "Subscription details for the user:",
        data,
    });
};
