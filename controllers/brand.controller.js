const Brand = require("../models/brand.model");

exports.createBrand = async (req, res) => {
  try {
    const existingBrand = await Brand.findOne({ name: req.body.name });
    if (existingBrand) {
      return res.status(400).json({ message: "This brand is now available!" });
    } else {
      const brand = new Brand(req.body);
      await brand.save();
      res
        .status(201)
        .json({ message: "The brand was successfully created", brand });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBrands = async (req, res) => {
  try {
    const brand = await Brand.find();
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateBrand = async (req, res) => {
  try {
    const updatedBrand = await Brand.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedBrand) {
      return res.status(404).json({ message: "Brand not found" });
    }else{
      res.status(200).json({ message: "The brand has been updated successfully", updatedBrand });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteBrand = async (req, res) => {
  try {
    await Brand.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "The brand was successfully deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.searchBrand = async (req, res) => {
  const { query } = req.query;
  try {
    const brands = await Brand.find({
      name: { $regex: query, $options: "i" },
    });
    res.status(200).json(brands);
  } catch (error) {
    res.json({ message: `Error searching brands: ${error.message}` });
  }
};
