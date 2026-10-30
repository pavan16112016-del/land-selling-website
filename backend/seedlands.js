require("dotenv").config();
const mongoose = require("mongoose");
const Land = require("./models/Land");
const connectDB = require("./config/database");

const sampleLands = [
  {
    title: "Green Acres Estate",
    location: "Bangalore North",
    price: 4500000,
    area: 2400,
    type: "Residential",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
    description: "Prime residential plot suitable for building modern villas."
  },
  {
    title: "Valley View Farm Land",
    location: "Mysore Rural",
    price: 3200000,
    area: 10000,
    type: "Agricultural",
    image: "https://images.unsplash.com/photo-1500076656116-558758c991c1?w=800",
    description: "Fertile agricultural land with drip irrigation access."
  },
  {
    title: "City Center Commercial Plot",
    location: "Bangalore Urban",
    price: 15000000,
    area: 5000,
    type: "Commercial",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    description: "High traffic zone ready for commercial complex construction."
  }
];

async function seedData() {
  try {
    await connectDB();
    await Land.deleteMany({});
    await Land.insertMany(sampleLands);
    console.log("Database seeded successfully with sample land listings!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seedData();