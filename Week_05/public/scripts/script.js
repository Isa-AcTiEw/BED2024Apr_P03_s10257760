async function fetchBooks() {

    // fetch function in Js
    const response = await fetch("/books"); // Replace with your API endpoint
    // response.json file
    const data = await response.json();
  
    const bookList = document.getElementById("book-list");
  
    data.forEach((book) => {
      // foreach loop iterating over all the books in the book db
      const bookItem = document.createElement("div");
      // create a new div element with the class book for each book in the array
      bookItem.classList.add("book"); // Add a CSS class for styling
  
      // Create elements for title, author, etc. and populate with book data
      const titleElement = document.createElement("h2");
      titleElement.textContent = book.title;
  
      const authorElement = document.createElement("p");
      authorElement.textContent = `By: ${book.author}`;
  
      // ... add more elements for other book data (optional)
     // add child elemnts to the parent element
      bookItem.appendChild(titleElement);
      bookItem.appendChild(authorElement);
      // ... append other elements
  
      bookList.appendChild(bookItem);
    });
  }


  /* The code iterates through the retrieved book data using a forEach loop.
Inside the loop, we create individual book elements (div with the class book) for each book.
We then create separate HTML elements (e.g., <h2> for title, <p> for author) and populate them with the corresponding book information extracted from the API response.
Finally, we append these elements to the individual book item (div) and then append the entire book item to the #book-list section in your index.html. */
  
  fetchBooks(); // Call the function to fetch and display book data