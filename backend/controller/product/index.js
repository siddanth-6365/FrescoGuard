const Product = require('../../models/Product');


module.exports.createProduct = async (req, res) => {
    const { crop, pesticide, sunlight, quantity, warehouseID } = req.body;
    const product = new Product({ crop, pesticide, sunlight, quantity });
    product.warehouse.push(warehouseID);
    await product.save();
    res.status(200).json("product created successfully");
};

// module.exports.getProduct = async (req, res) => {
//     const { id } = req.params;
//     const product = await Product.findById(id);
//     res.status(200).json(product);
// };

module.exports.getAllProducts = async (req, res) => {
    const { warehouse_id } = req.params;
    const products = await Product.find({ warehouse: warehouse_id });
    res.status(200).json(products);

};

