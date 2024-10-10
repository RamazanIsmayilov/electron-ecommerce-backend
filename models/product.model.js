const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    color: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Color",
      required: true
    }],
    storage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Storage"
    },
    size: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Size"
    },
    connectivity: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Connectivity"
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
