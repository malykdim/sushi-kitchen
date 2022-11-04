const { Schema, model, Types: { ObjectId } } = require('mongoose');


const orderSchema = new Schema({
    _clientId: { type: ObjectId, ref: 'User', required: true },
    image: { type: String, required: [true, 'Image is required'] },
    items: { 
        type: [ObjectId], 
        ref: 'Item',
        required: true
    },
    bill: { 
        type: Number, 
        validate: {
            validator: value => value >= 10 && value <= 10000,
            message: `Minimum ammout for delivery: 10 &euro;`
        } 
    },
    orderDate: { type: String, default: () => (new Date()).toISOString().slice(0, 10) },
    payment: { type: Boolean, default: false },
    delivered: { type: Boolean, default: false }    
});



const Order = model('Order', orderSchema);

module.exports = Order;