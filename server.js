require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const Task = require("./models/Task");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

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
        res.status(500).json({ message: error.message });
    }
});

// POST New Task
app.post("/api/tasks", async (req, res) => {
    try {
        const task = await Task.create({
            title: req.body.title
        });

        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
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
    } catch (error) {
        res.status(500).json({ message: error.message });
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
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE Task
app.delete("/api/tasks/:id", async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Server Start
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});