const {UserModel, BookModel} = require("../models/index");

//* Getting information or adding info to database takes certain time, that's why we'll use async and await in our function
exports.getAllBooks = async(req, res) => {
    const books = await BookModel.find(); //& 'books' here is now our **Database** not the JSON file

    if (books.length == 0){
        return res.status(404).json({
            success: false,
            message: "No Book Found",
        })
    }
    res.status(200).json({
        success: true,
        data: books,
    })
};

// router.get('/:id', (req, res) => {
//     const {id} = req.params;
//     const book = books.find((each) => each.id === id);
//     if(!book)
//     {
//         return res.status(404).json({
//             success: false,
//             message: "Book With This ID Doesn't Exist.",
//         });
//     }
//     return res.status(200).json({
//         success: true,
//         message: "Found The Book By It's ID.",
//         data: book,
//     });
// })

exports.getSingleBookById = async(req, res) => {
    const {id} = req.params;
    const book = await BookModel.findById(id);

    if(!book)
    {
        return res.status(404).json({
            success: false,
            message: "Book With This ID Doesn't Exist.",
        });
    }
    return res.status(200).json({
        success: true,
        message: "Found The Book By It's ID.",
        data: book,
    });
}

exports.getAllIssuedBooks = async(req, res) => {
    const users = await UserModel.find({
        issuedBook: {$exists: true} //* Because issuedBook is not a reqired field, that's why we check if it exists or not
    }).populate('issuedBook'); //* if exists then attach it back to users
    //~ users is like an array and populate is like an append method that pushes the element into it
    
    //^ Data Transfer Object (DTO)
    const issuedBook = users.map((each) => new IssuedBook(each));

    if(issuedBooks.length === 0){
        return res.status(404).json({
            success: false,
            message: "No Book Has Been Issued.",
        });
    }
    return res.status(200).json({
        success: true,
        message: "Users With The Issued Books..",
        data: issuedBooks,
    });
}

exports.addNewBook = async(req, res) => {
    const { data } = req.body;

    if(!data)
    {
        return res.status(200).json({
            success: false,
            message: "No Data To Add A Book"
        })
    }
    
    await BookModel.create(data);
    const allBooks = await BookModel.find()
    
    return res.status(201).json({
        success: true,
        message: "Book Added Successfully.",
        data: allBooks,
    })
    //* Id's are auto-generated not manually entering, so we can skip checking this condition
    // if(book)
    // {
    //     return res.status(404).json({
    //         success: false,
    //         message: "Book With This ID Already Exists.",
    //     });
    // }
}

exports.updateBookById = async(req, res) => {
    const {id} = req.params;
    const {data} = req.body;

    const updatedBook = await BookModel.findOneAndUpdate({
        _id: id,    //& if the auto-generated id is equal to the req.params id then
    }, data, {      //& update the data
        new: true,  //& and refresh it to latest data
    });

    res.status(200).json({
        success: true,
        message: "Book Updated",
        data: updatedBook,
    })
}
// module.exports = {getAllBooks, getSingleBookById};
// can also export certain module as: exports.getAllBooks = () => {}