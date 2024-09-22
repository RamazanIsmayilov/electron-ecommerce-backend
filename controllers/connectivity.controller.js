const Connectivity = require("../models/connectivity.model");

exports.createConnectivity = async (req, res) => {
  try {
    const existingConnectivity = await Connectivity.findOne({ name: req.body.name });
    if (existingConnectivity) {
      res.status(400).json({ message: "This connectivity is now available!" });
    } else {
      const connectivity = new Connectivity(req.body);
      await connectivity.save();
      res.status(201).json({ message: "Connectivity successfully created", connectivity });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getConnectivities = async (req, res) => {
  try {
    const connectivity = await Connectivity.find();
    res.status(200).json(connectivity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateConnectivity = async (req, res) => {
  try {
    const updatedConnectivity = await Connectivity.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedConnectivity) {
      return res.status(404).json({ message: "Connectivity not found" });
    } else {
      res.status(200).json({
        message: "The connectivity has been updated successfully",
        updatedConnectivity,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteConnectivity = async (req, res) => {
  try {
    await Connectivity.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "The connectivity was successfully deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.searchConnectivity = async (req, res) => {
  const { query } = req.query;
  try {
    const connectivities = await Connectivity.find({
      name: { $regex: query, $options: "i" },
    });
    res.status(200).json(connectivities);
  } catch (error) {
    res.json({ message: `Error searching colors: ${error.message}` });
  }
};
