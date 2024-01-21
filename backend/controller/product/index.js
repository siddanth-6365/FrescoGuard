// Assuming you have your models defined like this
const Product = require('../../models/Product');
const Warehouse = require('../../models/warehouse');

module.exports.createProduct = async (req, res) => {
    const { crop, pesticide, sunlight, quantity, warehouseID } = req.body;

    try {
        // Fetch the warehouse based on warehouseID
        const warehouse = await Warehouse.findById(warehouseID);

        if (!warehouse) {
            return res.status(404).json({ message: 'Warehouse not found' });
        }

        // Create a new product
        const product = new Product({ crop, pesticide, sunlight, quantity, warehouse: warehouse._id });
       
        // Save the product
        await product.save();

        // Update the warehouse with the new product (assuming you have a products array in your Warehouse model)
        warehouse.products.push(product._id);
        await warehouse.save();

        res.status(200).json({ message: 'Product created successfully' });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports.getProduct = async (req, res) => {
    try {
        const { warehouse_id, name } = req.params;

        const product = await Product.findOne({ warehouse: warehouse_id, crop: name });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports.getAllProducts = async (req, res) => {
    const { warehouse_id } = req.params;
    const products = await Product.find({ warehouse: warehouse_id });
    res.status(200).json(products);

};

