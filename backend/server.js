const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/database");
const landRoutes = require("./routes/landRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Path to frontend folder containing index.html, scripts, and styles
const frontendPath = path.resolve(__dirname, "../frontend");

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded land images if you have an uploads directory inside backend
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Serve all static frontend files (styles, scripts, images, html pages)
app.use(express.static(frontendPath));

// API routes
app.use("/api/lands", landRoutes);

// Serve index.html on root route
app.get("/", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Start server after connecting to MongoDB
async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`LandVista running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start backend:", error.message);
    process.exit(1);
  }
}

startServer();