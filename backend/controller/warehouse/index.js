const Warehouse = require('../../models/warehouse');
const Product = require('../../models/Product');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');  // If you're using JWTs for authentication

module.exports.createWarehouse = async (req, res) => {
    const {userId ,name, location, capacity } = req.body;
    const warehouse = new Warehouse({ name, location, capacity, user: userId });
    await warehouse.save();
    await User.findByIdAndUpdate(userId, { $push: { warehouses: warehouse._id } });
    res.status(200).json("Warehouse created successfully");
    
};



module.exports.getAllWarehouses = async (req, res) => {
    const { id } = req.params;
    const warehouses = await Warehouse.find({ user: id }).populate('products');
    res.status(200).json(warehouses);

        // const warehouses = await Warehouse.find({ user: userId}).populate('products');
        // res.status(200).json(warehouses);

};
