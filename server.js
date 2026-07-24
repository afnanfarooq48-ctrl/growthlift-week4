const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const Task = require("./models/Task");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("✅ MongoDB Connected");
})
.catch((err) => {
    console.log("❌ MongoDB Connection Error:", err);
});

// Home Route
app.get("/", (req, res) => {
    res.send("Welcome to Task API");
});

// GET All Tasks
app.get("/api/tasks", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// POST New Task
app.post("/api/tasks", async (req, res) => {
    try {

        // Input Validation
        if (!req.body.title) {
            return res.status(400).json({
                message: "Title is required"
            });
        }

        const task = await Task.create({
            title: req.body.title
        });

        res.status(201).json(task);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// GET Single Task
app.get("/api/tasks/:id", async (req, res) => {
    try {

        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Not found"
            });
        }

        res.json(task);

    } catch (err) {
        res.status(400).json({
            message: "Invalid ID format"
        });
    }
});

// PUT Update Task
app.put("/api/tasks/:id", async (req, res) => {
    try {

        const task = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!task) {
            return res.status(404).json({
                message: "Not found"
            });
        }

        res.json(task);

    } catch (err) {
        res.status(400).json({
            message: "Invalid ID format"
        });
    }
});

// DELETE Task
app.delete("/api/tasks/:id", async (req, res) => {
    try {

        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Not found"
            });
        }

        res.status(204).send();

    } catch (err) {
        res.status(400).json({
            message: "Invalid ID format"
        });
    }
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).json({
        message: "Something went wrong on the server"
    });
});

// Server Start
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});