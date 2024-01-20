const mongoose = require('mongoose');
const User = require('../user');
const Product = require('../Product');

const WarehouseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    name: {
        type: String,
        required: true,
    },

    location: {
        type: String,
    },

    capacity: {
        type: Number,
        required: true,
    },
    
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
        
    ],

});

module.exports = mongoose.model("Warehouse", WarehouseSchema);