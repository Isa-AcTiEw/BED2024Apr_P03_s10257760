const sql = require("mssql");
const dbConfig = require("../books-api-mvc-db/dbConfig.js")

class Book {
    constructor(id,title,author){
        this.id = id;
        this.title = title;
        this.author = author;
    }

    // retrives all Books in the Entity Book

    static async getAllBooks(){
        const connection = await sql.connect(dbConfig);
        const sqlQuery = `SELECT * FROM Books`; // request all tuples from books entty

        connection.close();

        const request = connect.request();

        const result = await request.query(sqlQuery);

        // close the db connection
        connection.close();
        // parse it as a book Object
        return result.recordset.map(
            (row) => new Book(row.id,row.title,row.author)
        ); //Convert each tuple in Book Entity to Book Object using a map


    }

    // Retrives all books that matches the id requested
    static async getBookById(id){
        const connection = await sql.connect(dbConfig);

        const sqlQuery = `SELECT * FROM Books WHERE id = @id`; // parameterized query

        const request = connection.request();
        request.input("id",id);

        const result = await request.query(sqlQuery);

        connection.close();

        return result.recordset[0]
        ? new Book(
            result.recordset[0].id,
            result.recordset[0].title,
            result.recordset[0].author
        )
        : null; // Handle Book not found
    }


}

module.exports = Book;
