const Book = require("../models/book.js")
const getAllBooks = require = async (req,res) =>{
    try{
        const Books = await Book.getAllBooks();
        res.json(books);

    }

    catch (error){
        console.error(error);
        res.status(500).send("Error Retrieving Book")
        // send a server error
    }
};


const getBookById = async (req,res) =>{
    try{
        const books = await Book.getAllBooks();
        if (!book){
            return res.status(404).send("Book not found");
            // sed a client error unable to find book requested
        }

        res.json(book);


    }

    catch (error){
        console.error(error);
        res.status((500).send("Error retrieving Book"))
        // handle server error
    }

};


module.exports = {
    getAllBooks,
    getBookById,
};

/*￼
* This code defines a controller object with functions for handling GET requests related to books.
* getAllBooks: This function utilizes the Book.getAllBooks method to retrieve all books. It catches potential errors and sends appropriate error responses to the client.
* getBookById: This function retrieves a book by ID using the Book.getBookById method. It parses the id from the request parameters, checks for successful retrieval, and sends either the retrieved book object or a "Book not found" response with a 404 status code.
 */