const Storage = require("../models/storage.model");

exports.createStorage = async (req, res) => {
  try {
    const existingStorage = await Storage.findOne({ name: req.body.name });
    if (existingStorage) {
      res.status(400).json({ message: "This storage is now available!" });
    } else {
      const storage = new Storage(req.body);
      await storage.save();
      res.status(201).json({ message: "Storage successfully created", storage });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getStorages = async (req, res) => {
  try {
    const storages = await Storage.find();
    res.status(200).json(storages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateStorage = async (req, res) => {
  try {
    const updatedStorage = await Storage.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedStorage) {
      return res.status(404).json({ message: "Storage not found" });
    } else {
      res.status(200).json({
        message: "The storage has been updated successfully",
        updatedStorage,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteStorage = async (req, res) => {
  try {
    await Storage.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "The storage was successfully deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.searchStorage = async (req, res) => {
  const { query } = req.query;
  try {
    const storages = await Storage.find({
      name: { $regex: query, $options: "i" },
    });
    res.status(200).json(storages);
  } catch (error) {
    res.json({ message: `Error searching storages: ${error.message}` });
  }
};
