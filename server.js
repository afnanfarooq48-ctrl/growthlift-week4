
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const Student = require("./models/Student");

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
    res.send("Welcome to Student API");
});


// GET All Students
app.get("/students", async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


// POST Student
app.post("/students", async (req, res) => {
    try {
        const student = new Student({
            name: req.body.name
        });

        await student.save();

        res.status(201).json({
            message: "Student Added Successfully",
            student
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


// PUT Student
app.put("/students/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            { name: req.body.name },
            { new: true }
        );

        if (!student) {
            return res.status(404).json({
                message: "Student Not Found"
            });
        }

        res.json({
            message: "Student Updated Successfully",
            student
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


// DELETE Student
app.delete("/students/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);

        if (!student) {
            return res.status(404).json({
                message: "Student Not Found"
            });
        }

        res.json({
            message: "Student Deleted Successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


// Server Start
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});