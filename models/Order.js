const { Schema, model, Types: { ObjectId } } = require('mongoose');


const orderSchema = new Schema({
    _clientId: { type: ObjectId, ref: 'User', required: true },
    image: { type: String, required: [true, 'Image is required'] },
    // items: { 
    //     type: [ObjectId], 
    //     ref: 'Item',
    //     required: true
    // },
    items: [{
        name: { type: String, required: true },
        qty: { type: Number, default: 0, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
            type: [ObjectId],
            ref: 'Item',
            required: true
        }
    }],
    bill: {
        type: Number,
        validate: {
            validator: value => value >= 10 && value <= 10000,
            message: `Minimum ammout for delivery: 10 &euro;`
        }
    },
    orderDate: { type: String, default: () => (new Date()).toISOString().slice(0, 10) },
    shippingAddress: {
        address: { type: String, required: [true, 'Image is required'] },
        city: { type: String, required: [true, 'Image is required'] },
        postalCode: { type: String, required: [true, 'Image is required'] },
        // country: { type: String, required: [true, 'Image is required'] },
    },
    payment: { type: Boolean, default: false },
    paidAt: { type: Date, },
    shippingPrice: { type: Number, requires: true },
    totalPrice: { type: Number, requires: true },
    tips: { type: Number },
    delivered: { type: Boolean, default: false },
    deliveredAt: { type: Date }
}, { timestamps: true });



const Order = model('Order', orderSchema);

module.exports = Order;