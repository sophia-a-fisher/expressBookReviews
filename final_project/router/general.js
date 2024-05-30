const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!doesExist(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //res.set(JSON.stringify(books,null, 4));

  const getBooks = () => {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve(books)
          },6000)})
}
    getBooks().then((books) => {
        res.json(books);
  })

});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    // let isbn = req.params.isbn;
    // let filtered_books = books.filter((book) => book.isbn === isbn);
    // res.send(filtered_books);

    let isbn = req.params.isbn;

    const getISBNBook = () => {
        return new Promise((resolve,reject) => {
            setTimeout(() => {
                const book = books.find((b) => b.isbn === isbn);
                resolve(book);
              },6000)})
    }

    getISBNBook().then((book) => {
        res.json(book);
  })

 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    // const author = req.params.author;
    // let filtered_books = books.filter((book) => book.author === author);
    // res.send(filtered_books);

    let author = req.params.author;

    const getAuthorBook = () => {
        return new Promise((resolve,reject) => {
            setTimeout(() => {
                const authorBooks = books.filter((b) => b.author === author);
                resolve(authorBooks);
              },6000)})
    }

    getISBNBook().then((authorBooks) => {
        res.json(authorBooks);
  })


});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    // const title = req.params.title;
    // let filtered_books = books.filter((book) => book.title === title);
    // res.send(filtered_books);

    const title = req.params.title;

    const getTitleBook = () => {
        return new Promise((resolve,reject) => {
            setTimeout(() => {
                const titleBooks = books.find((b) => b.title === title);
                resolve(titleBooks);
              },6000)})
    }

    getISBNBook().then((titleBooks) => {
        res.json(titleBooks);
  })
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    let isbn = req.params.isbn;
    res.send(JSON.stringify(books[isbn].review), null, 4);
});

module.exports.general = public_users;
