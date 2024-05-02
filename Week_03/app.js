const express = require('express');
const bodyParser = require('body-parser');
const booksController = require("./books-api-mvc/controllers/booksController")

const validateBook = require("./middlewares/validateBook");


// imports controller functions from a seperate file


const app = express();

app.use(bodyParser.json());// parse incoming json data in request body
app.use(bodyParser.urlencoded({extended: true}))

// Define individual routes for each controller function route handling
app.get("/books", validateBook, booksController.getAllBooks);
app.get("/books/:id", validateBook, booksController.getBookById);
app.post("/books", booksController.createBook);
app.put("/books/:id", booksController.updateBook);
app.delete("/books/:id", booksController.deleteBook);

// Define port and start the server on port 3000
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});