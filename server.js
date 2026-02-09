const express = require("express");
const app = express();
const PORT = 8000;

// Middleware to read JSON body
app.use(express.json());

// Student data
const students = [
  { id: 1, name: "raj", branch: "CSE" },
  { id: 2, name: "ajay", branch: "ECE" },
  { id: 3, name: "yash", branch: "IT" }
];
// Home route
app.get("/", (req, res) => {
  res.send("Welcome to Home Page");
});
// Get all students
app.get("/student", (req, res) => {
  res.json(students);
});

// Get student by ID
app.get("/student/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).send("Student not found");
  }

  res.json(student);
});

// Register new student
app.post("/student/register", (req, res) => {
  const data = req.body;

  if (!data || !data.id || !data.name || !data.branch) {
    return res.status(400).send("Please provide complete student data");
  }

  students.push(data);
  res.status(201).json({
    message: "Student registered successfully",
    student: data
  });
});
// Start server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});