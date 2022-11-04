const dataController = require('express').Router();

const { hasUser } = require('../middlewares/guards');
const { getAllItems, createItem } = require('../services/itemService');
const { parseError } = require('../util/parser');


dataController.get('/', async (req, res) => {
    const items = await getAllItems();
    res.json(items);
});

dataController.post('/', hasUser(), async (req, res) => {
    try {
        const data = Object.assign({ _chefId: req.user._id }, req.body);
        const item = await createItem(data);
        res.json(item);
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

module.exports = dataController;