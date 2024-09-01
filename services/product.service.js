const Product = require("../models/product.model");

exports.createProduct = async (productData) => {
  const product = new Product(productData);
  return await product.save();
};

exports.getProducts = async () => {
  return await Product.find();
};

exports.getProductById = async (productId) => {
  return await Product.findById(productId);
};

exports.updateProduct = async (productId, productData) => {
  return await Product.findByIdAndUpdate(productId, productData, { new: true });
};

exports.deleteProduct = async (productId) => {
  return await Product.findByIdAndDelete(productId);
};


exports.deleteAllProducts = async () => {
  return await Product.deleteMany();
};