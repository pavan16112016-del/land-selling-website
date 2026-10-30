const Land = require("../models/Land");

exports.getLands = async (req, res) => {
  try {
    const { location, maxPrice, landType, type } = req.query;
    const filter = {};

    if (location && location.trim() !== "") {
      filter.location = { $regex: location.trim(), $options: "i" };
    }

    if (maxPrice) filter.price = { $lte: Number(maxPrice) };

    const selectedType = type || landType;
    if (selectedType && selectedType.trim() !== "" && selectedType.toLowerCase() !== "all") {
      filter.type = { $regex: `^${selectedType.trim()}$`, $options: "i" };
    }

    const lands = await Land.find(filter).sort({ _id: -1 });
    res.json(lands);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch lands", error: error.message });
  }
};

exports.getLandById = async (req, res) => {
  try {
    const land = await Land.findById(req.params.id);
    if (!land) return res.status(404).json({ message: "Land not found" });
    res.json(land);
  } catch (error) {
    res.status(400).json({ message: "Invalid land ID" });
  }
};

exports.addLand = async (req, res) => {
  try {
    const land = await Land.create(req.body);
    res.status(201).json({ message: "Land listed successfully", land });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteLand = async (req, res) => {
  try {
    const land = await Land.findByIdAndDelete(req.params.id);
    if (!land) return res.status(404).json({ message: "Land not found" });
    res.json({ message: "Land deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};