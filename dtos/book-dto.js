//& Data Transfer Object (DTO) - Book

// Class name should always be in uppercase
class IssuedBook {
    _id;  //* Cause id is auto-generated, not some value that we are passing that's why '_id' not 'id'
    name;
    genre;
    price;
    publisher;
    issuedBy;
    issuedDate;
    returnDate;
    
    //~ When we create object, the constructor gets invoked
    constructor(user){
        this._id = user.IssuedBook._id; //~ this-> book obj, user-> user obj (transfering the data from one to another obj)
        this.name = user.IssuedBook.name;
        this.genre = user.IssuedBook.genre;
        this.price = user.IssuedBook.price;
        this.publisher = user.IssuedBook.publisher;
        this.issuedBy = user.IssuedBook.issuedBy;
        this.issuedDate = user.IssuedBook.issuedDate;
        this.returnDate = user.IssuedBook.returnDate;
    }
    // var ref = new IssuedBook(userobj);
}

module.exports = IssuedBook;