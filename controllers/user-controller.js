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
    return res.status(201).json({
        success: true,
        message: "User Added Successfully",
        data: users,
    })
}

exports.updateUserData = async(req, res) => {
    const {id} = req.params;
    const {data} = req.body;

    const updatedUser = UserModel.findOneAndUpdate({
        _id: id,
    }, 
    {
        $set: {
            ...data,
        }
    }, {
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
    
    const deletedUser = UserModel.deleteOne({_id: id});

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
