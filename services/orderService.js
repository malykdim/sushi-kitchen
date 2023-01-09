const Item = require('../models/Item');
const User = require('../models/User');
const Order = require('../models/Order');

async function getAllOrders() {
    return Order.find({});
}


async function placeOrder(order) {
    return Item.create(order);
}



module.exports = {
    getAllOrders,
    placeOrder
}