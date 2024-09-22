const Product = require("../models/product.model");
const Category = require('../models/category.model');
const Brand = require('../models/brand.model');

exports.createProduct = async (req, res) => {
  try { 
    const { category, brand } = req.body
    const categoryExists = await Category.findById(category);
    const brandExists = await Brand.findById(brand);

    if (!categoryExists || !brandExists) {
      return res.status(400).json({ message: "Invalid category and brand" });
    }

    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ message: "The product was successfully created", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category').populate('brand').populate('color').populate('connectivity').populate('size').populate('storage')
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { category, brand } = req.body;
    const categoryExists = await Category.findById(category);
    const brandExists = await Brand.findById(brand);
    if (!categoryExists || !brandExists) {
      return res.status(400).json({ message: "Invalid category and brand" });
    }
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteAllProducts = async (req, res) => {
  try {
    await Product.deleteMany();
    res.status(200).json({ message: 'All products have been deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
