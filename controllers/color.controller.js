const Color = require("../models/color.model");

exports.createColor = async (req, res) => {
  try {
    const existingColor = await Color.findOne({ name: req.body.name });
    if (existingColor) {
      res.status(400).json({ message: "This color is now available!" });
    } else {
      const color = new Color(req.body);
      await color.save();
      res.status(201).json({ message: "Color successfully created", color });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getColors = async (req, res) => {
  try {
    const color = await Color.find();
    res.status(200).json(color);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateColor = async (req, res) => {
  try {
    const updatedColor = await Color.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedColor) {
      return res.status(404).json({ message: "Color not found" });
    } else {
      res.status(200).json({
        message: "The color has been updated successfully",
        updatedColor,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteColor = async (req, res) => {
  try {
    await Color.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "The color was successfully deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.searchColor = async (req, res) => {
  const { query } = req.query;
  try {
    const colors = await Color.find({
      name: { $regex: query, $options: "i" },
    });
    res.status(200).json(colors);
  } catch (error) {
    res.json({ message: `Error searching colors: ${error.message}` });
  }
};
