var express = require('express');
var User = require('../models/User');
var Item = require('../models/Item');
var auth = require('../middlewares/auth');

var router = express.Router();

// Protecting the routes
router.use(auth.verifyToken);

/* GET list of all items. */
router.get('/', async function (req, res, next)
{
    try
    {
        var items = await Item.find({});
        res.status(200).json({ items });
    } catch (error)
    {
        next(error);
    }
});

// create a new Item
router.post('/', async (req, res, next) =>
{
    let data = req.body;
    req.body.CreatedBy = req.user.userId;
    try
    {
        var createdItem = await Item.create(data);
        res.status(200).json({ createdItem });
    } catch (error)
    {
        next(error);
    }
});

// //update a Item-item

router.put('/:id', async (req, res, next) =>
{
    let data = req.body;
    let ItemId = req.params.id;
    try
    {
        var updatedItem = await Item.findByIdAndUpdate(ItemId, data);
        res.status(200).json({ updatedItem });
    } catch (error)
    {
        next(error);
    }
});

// //delete a Item-item

router.delete('/delete/:id', async (req, res, next) =>
{
    let ItemId = req.params.id;
    try
    {
        let deletedItem = await Item.findByIdAndDelete(ItemId);
        res.status(200).json({ deletedItem });
    } catch (error)
    {
        next(error);
    }
});



module.exports = router;