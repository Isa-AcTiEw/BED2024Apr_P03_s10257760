const sql = require("mssql");
const dbConfig = require("../config/dbConfig")

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

        // retruns the result of the query 
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

    static async createBook(newBookData) {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `INSERT INTO Books (title, author) VALUES (@title, @author); SELECT SCOPE_IDENTITY() AS id;`; // Retrieve ID of inserted record
    
        const request = connection.request();
        request.input("title", newBookData.title);
        request.input("author", newBookData.author);
    
        const result = await request.query(sqlQuery);
    
        connection.close();
    
        // Retrieve the newly created book using its ID
        return this.getBookById(result.recordset[0].id);
      }

      static async updateBook(id, newBookData) {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `UPDATE Books SET title = @title, author = @author WHERE id = @id`; // Parameterized query
    
        const request = connection.request();
        request.input("id", id);
        request.input("title", newBookData.title || null); // Handle optional fields
        request.input("author", newBookData.author || null);
    
        await request.query(sqlQuery);
    
        connection.close();
    
        return this.getBookById(id); // returning the updated book data
      }
    
      static async deleteBook(id) {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `DELETE FROM Books WHERE id = @id`; // Parameterized query
    
        const request = connection.request();
        request.input("id", id);
        const result = await request.query(sqlQuery);
    
        connection.close();
    
        return result.rowsAffected > 0; // Indicate success based on affected rows
      }

      static async getUsersWithBooks() {
        const connection = await sql.connect(dbConfig);
        
        // joining tables be it left join inner join allows for you to query information from multiple tables and display it to the client
        // Comparing the fk (ub.user_id = u.id, ub.book_id = b.id) 
        // from right and left tables if it matches then join this allows to retrive the books borrowed by secific user and the book details
        // u and ub are table alias representing Users and UserBooks tables respectively
        try {
          const query = `
            SELECT u.id AS user_id, u.username, u.email, b.id AS book_id, b.title, b.author
            FROM Users u
            LEFT JOIN UserBooks ub ON ub.user_id = u.id
            LEFT JOIN Books b ON ub.book_id = b.id
            ORDER BY u.username;
          `;
    
          const result = await connection.request().query(query);
    
          // Group each users and their books 
          const usersWithBooks = {};
          for (const row of result.recordset) {
            const userId = row.user_id;
            if (!usersWithBooks[userId]) {
              usersWithBooks[userId] = {
                id: userId,
                username: row.username,
                email: row.email,
                books: [],
              };
            }
            usersWithBooks[userId].books.push({
              id: row.book_id,
              title: row.title,
              author: row.author,
            });
          }
    
          return Object.values(usersWithBooks);
        } 
        catch (error) {
          throw new Error("Error fetching users with books");
        } 
        finally {
          await connection.close();
        }
      }
}

module.exports = Book;
