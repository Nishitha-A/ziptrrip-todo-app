const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const todoRoutes = require("./routes/todos");

const app = express();

app.use(cors());
app.use(express.json());


// API Routes
app.use("/api/todos", todoRoutes);


// Serve React frontend
const clientBuildPath = path.join(__dirname, "../client/dist");

app.use(express.static(clientBuildPath));


// React fallback route - Express 5 compatible
app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(process.env.PORT || 5000, () => {
      console.log(
        `Server running on port ${process.env.PORT || 5000}`
      );
    });
  })
  .catch((error) => {
    console.log("Database connection error:", error);
  });