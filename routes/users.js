const express = require("express");
const { users } = require("../data/users.json");
// const e = require("express");

const {
    getAllUsers,
    getSingleUserById,
    deleteUser,
    updateUserData,
    createNewUser,
    getSubscriptionDetailsById,
} = require('../controllers/user-controller');

const router = express.Router(); //~ for creating a modular set of routes to handle specific paths, which you can integrate into the main app using app.use()

//^ AFTER DATABASE CONNECTION (added models)
const {UserModel, BookModel} = require("../models/index"); 

/**
 *! Route: /
 *& Method: GET
 * Description: Get all users
 * Access: Public 
 * Parameters: None
 */
// http://127.0.0.1:8081/users

router.get("/", getAllUsers);

/**
 *! Route: /:id
 *& Method: GET
 * Description: Get single user by it's id
 * Access: Public 
 * Parameters: Id
 */

router.get('/:id', getSingleUserById);

/**
 *! Route: /
 *& Method: POST
 * Description: Create a new user
 * Access: Public 
 * Parameters: None
 */

router.post("/", createNewUser)

/**
 *! Route: /:id
 *& Method: PUT
 * Description: Updating a user by it's id
 * Access: Public 
 * Parameters: ID
 */

 router.put("/:id", updateUserData);

 /**
 *! Route: /:id
 *& Method: DELETE
 * Description: Deleting a user by it's id
 * Access: Public 
 * Parameters: ID
 */

 router.delete("/:id", deleteUser)

/**
 *! Route: /subscription-details/:id
 *& Method: GET
 * Description: Get all user subscription details
 * Access: Public 
 * Parameters: ID
 */

 router.get('/subscription-details/:id', getSubscriptionDetailsById);

 module.exports = router;