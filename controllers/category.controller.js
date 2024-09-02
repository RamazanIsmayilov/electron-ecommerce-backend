const Category = require("../models/category.model");

exports.createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json({message: 'The category was successfully created', category});
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
};

exports.getCategories = async (req, res) => {
    try {
      const category = await Category.find();
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
};
  
exports.updateCategory = async (req, res) => {
  try {
      const { id } = req.params;
      const { name } = req.body; // Düzgün açar `name` olmalıdır

      if (!name) {
          return res.status(400).json({ message: 'Category name is required' });
      }

      // Kateqoriyanı yenilə
      const updatedCategory = await Category.findByIdAndUpdate(id, { name }, { new: true, runValidators: true });

      if (!updatedCategory) {
          return res.status(404).json({ message: 'Category not found' });
      }

      res.status(200).json(updatedCategory);
  } catch (error) {
      console.error('Update failed:', error);
      res.status(500).json({ message: `Error updating category: ${error.message}` });
  }
};



exports.deleteCategory = async (req, res) => {
    try {
      await Category.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Category deleted" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
};