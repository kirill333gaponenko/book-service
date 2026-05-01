import express from "express";
import {addBook, findBookByIsbn, removeBook, updateBook} from "../controller/book.controller.js";
import {findBooksByAuthor} from "../controller/author.controller.js";

const router = express.Router();


router.post('/book', addBook)
router.get('/book/:isbn', findBookByIsbn)
router.delete('/book/:isbn', removeBook)
router.patch('/book/:isbn/title/:title', updateBook)
router.get('/books/author/:author', findBooksByAuthor)

export default router;