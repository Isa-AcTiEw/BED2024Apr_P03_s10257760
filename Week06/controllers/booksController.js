const Book = require("../models/Book")
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

/*￼
* This code defines a controller object with functions for handling GET requests related to books.
* getAllBooks: This function utilizes the Book.getAllBooks method to retrieve all books. It catches potential errors and sends appropriate error responses to the client.
* getBookById: This function retrieves a book by ID using the Book.getBookById method. It parses the id from the request parameters, checks for successful retrieval, and sends either the retrieved book object or a "Book not found" response with a 404 status code.
 */

const createBook = async (req, res) => {
    const newBook = req.body;
    try {
      const createdBook = await Book.createBook(newBook);
      res.status(201).json(createdBook);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error creating book");
    }
};

const updateBook = async (req, res) => {
    const bookId = parseInt(req.params.id);
    const newBookData = req.body;
  
    try {
      const updatedBook = await Book.updateBook(bookId, newBookData);
      if (!updatedBook) {
        return res.status(404).send("Book not found");
      }
      res.json(updatedBook);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error updating book");
    }
  };
  
  const deleteBook = async (req, res) => {
    const bookId = parseInt(req.params.id);
  
    try {
      const success = await Book.deleteBook(bookId);
      if (!success) {
        return res.status(404).send("Book not found");
      }
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).send("Error deleting book");
    }
  };

  
const getUsersWithBooks = async (req,res) =>{
  try {
    const users = await User.getUsersWithBooks();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching users with books" });
  }
} 








module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
};

