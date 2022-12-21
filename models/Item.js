const { Schema, model, Types: { ObjectId } } = require('mongoose');

// const reviewSchema = new Schema({
//     name: { type: String, required: true },
//     rating: { type: Number, required: true },
//     comment: { type: String, required: true }
// }, { timestamps: true });

const URL_PATTERN = /^https?:\/\/.+$/i;

const itemSchema = new Schema({
    name: { type: String, required: true },
    image: { 
        type: String, 
        validate: {
            validator: (value) => URL_PATTERN.test(value),
            message: (props) => {
                console.log(props);
                return `${props.value} is not a valid image URL`;
            }
        },
        required: true 
    },
    category: { 
        type: String, 
        enum: {
            values: ['drinks', 'maki', 'something', 'desserts'], 
            message: props => `${Object.keys(props)}({VALUE}) is not supported`
        },
        default: ''
    },
    ingredients: { 
        type: [String], 
        enum: {
            values: ['rise', 'tuna', 'lachs'], 
            message: props => `${Object.keys(props)}({VALUE}) is not supported`
        },
        required: true         
    },
    temperature: { type: String, required: true },
    price: { type: Number, min: [1, 'Price must be a positive number'] },
    _chefId: { type: ObjectId, ref: 'User', required: true }
});


const Item = model('Item', itemSchema);

module.exports = Item;