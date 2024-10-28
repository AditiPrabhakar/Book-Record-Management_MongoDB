const express = require("express");
const {getAllBooks, 
    getSingleBookById, 
    getAllIssuedBooks,
    addNewBook,
} = require("../controllers/book-controller");
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");

const router = express.Router();

//^ AFTER DATABASE CONNECTION (added models)
const {UserModel, BookModel} = require("../models/index");

/**
 *! Route: /
 *& Method: GET
 * Description: Get all books
 * Access: Public 
 * Parameters: None
 */
// http://127.0.0.1:8081/users

router.get("/", getAllBooks);

/**
 *! Route: /books/issued
 *& Method: GET
 * Description: Getting all issued books
 * Access: Public 
 * Parameters: None
 */

router.get('/issued', getAllIssuedBooks);

/**
 *! Route: /:id
 *& Method: GET
 * Description: Get a book by it's id
 * Access: Public 
 * Parameters: Id
 */

 router.get('/:id', getSingleBookById);

/**
 *! Route: /
 *& Method: POST
 * Description: Adding a new book
 * Access: Public 
 * Parameters: None
 * Data: id, name, genre, price, publisher
 */

 router.post('/', addNewBook);

 /**
 *! Route: /updateBook/:id
 *& Method: PUT
 * Description: Updating boook by id
 * Access: Public 
 * Parameters: ID
 * Data: id, name, genre, price, publisher
 */

 router.put("/:id", (req, res) => {
    const {id} = req.params;
    const {data} = req.body;
    const book = books.find((each) => each.id === id);

    if(!book)
    {
        return res.status(404).json({
            success: false,
            message: "Book With This ID Doesn't Exist.",
        });
    }
    const updateBookData = books.map((each) => {
        if(each.id === id)
        {
            return {
                //* Can't write this vice-versa (each -> key, data -> value)
                ...each, //each -> name, id, surname..etc
                ...data, //spread operator as they will be updating just part of data
            }
        }
        return each;
    });
    res.status(200).json({
        success: true,
        message: "Book Updated",
        data: updateBookData,
    })
 })

module.exports = router;