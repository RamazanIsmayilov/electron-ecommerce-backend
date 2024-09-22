const Size = require("../models/size.model");

exports.createSize = async (req, res) => {
  try {
    const existingSize = await Size.findOne({ name: req.body.name });
    if (existingSize) {
      res.status(400).json({ message: "This size is now available!" });
    } else {
      const size = new Size(req.body);
      await size.save();
      res.status(201).json({ message: "Size successfully created", size });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSizes = async (req, res) => {
  try {
    const size = await Size.find();
    res.status(200).json(size);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateSize = async (req, res) => {
  try {
    const updatedSize = await Size.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedSize) {
      return res.status(404).json({ message: "Size not found" });
    } else {
      res.status(200).json({
        message: "The size has been updated successfully",
        updatedSize,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteSize = async (req, res) => {
  try {
    await Size.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "The size was successfully deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.searchSize = async (req, res) => {
  const { query } = req.query;
  try {
    const sizes = await Size.find({
      name: { $regex: query, $options: "i" },
    });
    res.status(200).json(sizes);
  } catch (error) {
    res.json({ message: `Error searching colors: ${error.message}` });
  }
};
