const mongoose = require("mongoose");

const landSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  area: { type: Number, required: true },
  type: { type: String, default: "Residential" },
  image: { type: String, default: "" },
  description: { type: String, default: "" }
});

module.exports = mongoose.model("Land", landSchema);