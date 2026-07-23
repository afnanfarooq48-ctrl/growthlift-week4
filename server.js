const express = require("express");

const app = express();
const PORT = 3000;

// Middleware
// Middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(express.json());


// Home Route
app.get("/", (req, res) => {
  res.send("Welcome to GrowthLift API");
});

// About Route
app.get("/about", (req, res) => {
  res.send("This is the About route");
});

// Interns Route
app.get("/api/interns", (req, res) => {
  res.json({
    interns: ["Ali", "Sara", "Bilal"]
  });
});

// Route Parameter
app.get("/api/interns/:id", (req, res) => {
  res.json({
    id: req.params.id,
    name: "Sample Intern"
  });
});

// Query Parameter
app.get("/api/search", (req, res) => {
  res.json({
    query: req.query.q
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});