const Warehouse = require('../../models/warehouse');
const Product = require('../../models/Product');

module.exports.createWarehouse = async (req, res) => {
    const { name, location, capacity } = req.body;
    const warehouse = new Warehouse({ name, location, capacity, user: req.user._id });
    await warehouse.save();
    res.status(200).json("warehouse created successfully");
};

module.exports.getWarehouse = async (req, res) => {
    const { id } = req.params;
    const warehouse = await Warehouse.findById(id).populate('products');
    res.status(200).json(warehouse);
};

module.exports.getAllWarehouses = async (req, res) => {
    const warehouses = await Warehouse.find({ user: req.user._id }).populate('products');
    res.status(200).json(warehouses);
};
