const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 8000;
const FILE_PATH = "./students.json";

app.use(express.json());

// Read Students Function
function readStudents(callback) {
  fs.readFile(FILE_PATH, "utf-8", (err, data) => {
    if (err) {
      callback(err, null);
      return;
    }

    let students = [];

    try {
      students = JSON.parse(data);
    } catch (error) {
      students = [];
    }

    callback(null, students);
  });
}

//Write Students Function
function writeStudents(students, callback) {
  fs.writeFile(FILE_PATH, JSON.stringify(students, null, 2), (err) => {
    if (err) {
      callback(err);
      return;
    }

    callback(null);
  });
}

//Home Route
app.get("/", (req, res) => {
  res.send("Welcome to Home page");
});

//Get all students on search 
app.get("/students", (req, res) => {
  const name = req.query.name;

  readStudents((err, students) => {
    if (err) {
      res.status(500).json({ message: "File read error" });
      return;
    }

    if (name) {
      students = students.filter(
        student => student.name.toLowerCase() === name.toLowerCase()
      );
    }

    res.json(students);
  });
});

//get students by id 
app.get("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);

  readStudents((err, students) => {
    if (err) {
      res.status(500).json({ message: "File read error" });
      return;
    }

    const student = students.find(s => s.id === id);

    if (!student) {
      res.status(404).json({ message: "Student not found" });
      return;
    }

    res.json(student);
  });
});

//add new student
app.post("/students", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const branch = req.body.branch;

  if (!name || typeof age !== "number" || !branch) {
    res.status(400).json({ message: "Invalid data" });
    return;
  }

  readStudents((err, students) => {
    if (err) {
      res.status(500).json({ message: "File read error" });
      return;
    }

    let newId = 1;
    if (students.length > 0) {
      newId = students[students.length - 1].id + 1;
    }

    const newStudent = {
      id: newId,
      name: name,
      age: age,
      branch: branch
    };

    students.push(newStudent);

    writeStudents(students, (err) => {
      if (err) {
        res.status(500).json({ message: "File write error" });
        return;
      }

      res.status(201).json({
        message: "Student registered successfully",
        student: newStudent
      });
    });
  });
});

//update student
app.put("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);

  readStudents((err, students) => {
    if (err) {
      res.status(500).json({ message: "File read error" });
      return;
    }

    const student = students.find(s => s.id === id);

    if (!student) {
      res.status(404).json({ message: "Student not found" });
      return;
    }

    if (req.body.name) student.name = req.body.name;
    if (req.body.age) student.age = req.body.age;
    if (req.body.branch) student.branch = req.body.branch;

    writeStudents(students, (err) => {
      if (err) {
        res.status(500).json({ message: "File write error" });
        return;
      }

      res.json({
        message: "Student updated successfully",
        student: student
      });
    });
  });
});

//delete student 
app.delete("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);

  readStudents((err, students) => {
    if (err) {
      res.status(500).json({ message: "File read error" });
      return;
    }

    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
      res.status(404).json({ message: "Student not found" });
      return;
    }

    const deletedStudent = students.splice(index, 1)[0];

    writeStudents(students, (err) => {
      if (err) {
        res.status(500).json({ message: "File write error" });
        return;
      }

      res.json({
        message: "Student deleted successfully",
        student: deletedStudent
      });
    });
  });
});

//server start 
app.listen(PORT, () => {
  console.log("Server running on http://localhost:" + PORT);
});