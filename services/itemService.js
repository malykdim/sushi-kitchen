const Item = require('../models/Item');

async function getAllItems() {
    return Item.find({});
}

async function getItembyId(id) {
    return Item.findById(id);
}

async function createItem(item) {
    return Item.create(item);
}

async function updateItem(id, item) {
    const existing = await Item.findById(id);
    
    existing.name = item.name;
    existing.image = item.image;
    existing.price = item.price;
    existing.category = item.category;
    existing.ingredients = item.ingredients;
    
    existing.save();
    
    return existing;
}

async function deleteItem(id) {
    return Item.findByIdAndDelete(id);
}

async function getByUserId(userId) {
    return Item.find({ _chefId: userId});
}

module.exports = {
    getAllItems,
    getItembyId,
    createItem,
    updateItem,
    deleteItem,
    getByUserId
}