const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true },
    // isAdmin: { type: Boolean, default: false, required: true },
    role: {
        type: String,
        enum: {
            values: ['client', 'chef', 'admin'],
            message: props => `${Object.keys(props)}({VALUE}) is not supported`
        },
        default: 'client'
    }
}, { timestamps: true });

userSchema.index({ email: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;