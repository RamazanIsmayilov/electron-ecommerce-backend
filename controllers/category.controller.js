const Category = require("../models/category.model");

exports.createCategory = async (req, res) => {
  try {
    const existingCategory = await Category.findOne({ name: req.body.name });
    if (existingCategory) {
      return res
        .status(400)
        .json({ message: "This category is now available!" });
    } else {
      const category = new Category(req.body);
      await category.save();
      res
        .status(201)
        .json({ message: "Category successfully created", category });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const category = await Category.find();
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }else{
      res.status(200).json({ message: "The category has been updated successfully", updatedCategory });
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error("Update failed:", error);
    res
      .status(500)
      .json({ message: `Error updating category: ${error.message}` });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "The category was successfully deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.searchCategory = async (req, res) => {
  const { query } = req.query;
  try {
    const categories = await Category.find({
      name: { $regex: query, $options: "i" },
    });
    res.status(200).json(categories);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error searching categories: ${error.message}` });
  }
};
