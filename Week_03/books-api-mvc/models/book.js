/* Classes in javaScript are bacially blueprints for defining 
   user's own datatype which have member varibles (properties) and methids. */

// Js does not have traditional classes like Java and C++ but simulates 
// them using prototype-based inheritance

/*MVC (Model-View Controller)
    represents the data and buisness logic of the application.

    - Manages the data
    - defines data structures such as classes
    - Encapsulates data access (public,private access modifiers. Hides logic from user)*/


    // data
    const books = [
        {id: 1, title: "The Lord of the Rings", author: "J.R.R. Tolkien"},
    {id:2, title: "Pride and Prejudice", author: "Jane Austen"}]
    
    
    class Book{

        // Creating a new book instance
        constructor(id,title,author){
            this.id = id;
            this.title= title;
            this.author = author;
        }

        // Methods for CRUD
        static async getAllBooks(){
            return books;
        }

        static async getBookById(id){
            const books = await this.getAllBooks();
            const book = books.find((book) => book.id === id);
            return book;
        }

        static async createBook(newBookData){
            const books = await this.getAllBooks();
            const newBook = new Book(
                books.length + 1,
                newBookData.title,
                newBookData.author
            );

            books.push(newBook);
            return newBook;
        }

        static async updateBook(id, newBookData){
            const books = await this.getAllBooks();
            const existingBookIndex = books.findIndex((book => book.id === id));
            if (existingBookIndex === -1){
                return null; // book not found
            }

            const updateBook = {
                ...books[existingBookIndex],
                ...newBookData,
            }

            books[existingBookIndex] = updateBook;
            return updatedBook;
        }

        static async deleteBook(id){
            const books = await this.getAllBooks();
            const bookIndex = books.findIndex((book) => book.id === id);
            if (bookIndex === -1){
                return false;
            }

            books.splice(bookIndex,1);
            return true;
        }

    }

    module.exports = Book;

    /*This in-memory data 
    management approach is suitable for demonstration purposes only. 
    In a real application, you'd utilize a database for data persistence and retrieval for scalability and reliability.*/


    