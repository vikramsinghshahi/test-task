var express = require('express');
var User = require('../models/User');
var Book = require('../models/Book');
var auth = require('../middlewares/auth');

var router = express.Router();

// Protecting the routes
router.use(auth.verifyToken);

/* GET list of all books. */
router.get('/', async function (req, res, next)
{
    try
    {
        var books = await Book.find({});
        res.status(200).json({ books });
    } catch (error)
    {
        next(error);
    }
});

// create a new book
router.post('/', async (req, res, next) =>
{
    let data = req.body;
    req.body.CreatedBy = req.user.userId;
    try
    {
        var createdBook = await Book.create(data);
        res.status(200).json({ createdBook });
    } catch (error)
    {
        next(error);
    }
});

// //update a book-item

router.put('/:id', async (req, res, next) =>
{
    let data = req.body;
    let bookId = req.params.id;
    try
    {
        var updatedBook = await Book.findByIdAndUpdate(bookId, data);
        res.status(200).json({ updatedBook });
    } catch (error)
    {
        next(error);
    }
});

// //delete a book-item

router.delete('/delete/:id', async (req, res, next) =>
{
    let bookId = req.params.id;
    try
    {
        let deletedBook = await Book.findByIdAndDelete(bookId);
        res.status(200).json({ deletedBook });
    } catch (error)
    {
        next(error);
    }
});



module.exports = router;