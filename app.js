// Import the required modules
const express = require('express');
const bodyParser = require('body-parser');

// Initialize Express
const app = express();

// Use body-parser middleware to parse JSON request bodies
app.use(bodyParser.json());

// In-memory database (an array of books)
let books = [
  { id: 1, title: "1984", author: "George Orwell" },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" },
  { id: 3, title: "The Great Gatsby", author: "F. Scott Fitzgerald" }
];

// Home route to check if the server is running
app.get('/', (req, res) => {
  res.send('Welcome to the Bookstore API!');
});

// Get all books
app.get('/books', (req, res) => {
  res.json(books);  // Send the list of books as a JSON response
});

// Get a book by ID
app.get('/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) {
    return res.status(404).send('Book not found');
  }
  res.json(book);
});

// Add a new book
app.post('/books', (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).send('Title and Author are required');
  }

  const newBook = {
    id: books.length + 1,
    title,
    author
  };

  books.push(newBook);  // Add the new book to the "database"
  res.status(201).json(newBook);  // Send back the newly created book
});

// Delete a book by ID
app.delete('/books/:id', (req, res) => {
  const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
  if (bookIndex === -1) {
    return res.status(404).send('Book not found');
  }

  books.splice(bookIndex, 1);  // Remove the book from the array
  res.send('Book deleted');
});

// Set up the server to listen on port 3000
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
