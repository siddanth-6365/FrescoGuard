const mongoose = require('mongoose');
const Warehouse = require('../warehouse');

const ProductSchema = new mongoose.Schema({
    crop: {
        type: String,
        required: true,
    },

    pesticide: {
        type: String,
        required: true,
    },
    
    sunlight: {
        type: String,
        required: true,
    },

    quantity: {
        type: String,
        required: true,
    },

    warehouse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Warehouse",
    },

});


module.exports = mongoose.model("Product", ProductSchema);