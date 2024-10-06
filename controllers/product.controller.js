const Product = require("../models/product.model");
const fs = require("fs");
const path = require("path");

exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, category, brand, color, storage, size, connectivity } = req.body;
    const imageUrls = req.files.map(file => `http://localhost:5001/uploads/${file.filename}`); 

    const product = new Product( {
      name,
      images: imageUrls,
      price,
      description,
      category,
      brand,
      color,
      storage: storage || null,
      size: size || null,
      connectivity: connectivity || null
    });
    
    await product.save()
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create product' });
  }
};


exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category")
      .populate("brand")
      .populate("color")
      .populate("storage")
      .populate("size")
      .populate("connectivity");
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
    const updatedData = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (req.files) {
      product.images.forEach((image) => {
        const imagePath = path.join(__dirname, "../uploads", image);
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error("Failed to delete image:", err);
          }
        });
      });
      updatedData.images = req.files.map((file) => file.filename);
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.images.forEach((image) => {
      const imagePath = path.join(__dirname, "../uploads", path.basename(image));
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Failed to delete image:", err);
        }
      });
    });

    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};