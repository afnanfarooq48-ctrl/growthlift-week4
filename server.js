const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

// Sample Data
let students = [
  { id: 1, name: "Ali" },
  { id: 2, name: "Sara" },
  { id: 3, name: "Bilal" }
];

// Home Route
app.get("/", (req, res) => {
  res.send("Welcome to Student API");
});

// GET All Students
app.get("/students", (req, res) => {
  res.json(students);
});

// GET Student by ID
app.get("/students/:id", (req, res) => {
  const student = students.find(s => s.id == req.params.id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.json(student);
});

// POST New Student
app.post("/students", (req, res) => {
  const newStudent = {
    id: students.length + 1,
    name: req.body.name
  };

  students.push(newStudent);

  res.status(201).json({
    message: "Student added successfully",
    student: newStudent
  });
});

// PUT Update Student
app.put("/students/:id", (req, res) => {
  const student = students.find(s => s.id == req.params.id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  student.name = req.body.name;

  res.json({
    message: "Student updated successfully",
    student
  });
});

// DELETE Student
app.delete("/students/:id", (req, res) => {
  students = students.filter(s => s.id != req.params.id);

  res.json({
    message: "Student deleted successfully"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});