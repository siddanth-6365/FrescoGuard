const mongoose = require('mongoose');
const Warehouse = require('../warehouse');

const ProductSchema = new mongoose.Schema({
    crop: {
        type: String,
        required: true,
    },

    pesticide: {
        type: Number,
        required: true,
    },
    
    sunlight: {
        type: Number,
        required: true,
    },


    price: {
        type: Number,
        required: true,
    },

    quantity: {
        type: Number,
        required: true,
    },

    warehouse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Warehouse",
    },

});


module.exports = mongoose.model("Product", ProductSchema);