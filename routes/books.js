const express = require("express");
const {getAllBooks, 
    getSingleBookById, 
    getAllIssuedBooks,
    addNewBook,
    updateBookById,
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

 router.put("/:id", updateBookById);

module.exports = router;