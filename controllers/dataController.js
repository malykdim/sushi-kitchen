const dataController = require('express').Router();

const { hasUser } = require('../middlewares/guards');
const { getAllItems, createItem, getItembyId, updateItem, deleteItem } = require('../services/itemService');
const { parseError } = require('../util/parser');

/* '/' */
dataController.get('/', async (req, res) => {
    try {
        const items = await getAllItems();
        res.json(items);    
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
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

/* '/:id' */
dataController.get('/:id', async (req, res) => {
    try {
        const item = await getItembyId(req.params.id);
        res.json(item);
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }    
});

dataController.put('/:id', hasUser(), async (req, res) => {
    // role check
    const item = await getItembyId(req.params.id);
    if (req.user._id != item._chefId) {
        return res.status(403).json({ message: 'You cannot modify this record' });
    }
    
    try {
        const result = await updateItem(req.params.id, req.body);
        res.json(result);
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

dataController.delete('/:id', hasUser(), async (req, res) => {
    // role check
    const item = await getItembyId(req.params.id);
    if (req.user._id != item._chefId) {
        return res.status(403).json({ message: 'You cannot delete this record' });
    }
    
    try {
        await deleteItem(req.params.id);
        res.status(204).end();
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

module.exports = dataController;