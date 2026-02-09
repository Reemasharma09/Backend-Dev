// //import express
// //const express=require("express")
// //const app=express()
// //const PORT=8000;
// //const student=[
// //   {id:1,name:"raj",branch:"CSE"},
//   //  {id:2,name:"ajay",branch:"ECE"},
//     {id:3,name:"yash",branch:"IT"}
// ]
// //define a route
// app.get("/",(req,res) => {
//    res.send("welcome to home page");
// })
// app.get("/student",(res,req)=>{
//     res.json("user page")
// })
// app.get("/student/:id",(res,req)=>{
//     const id=req.params.id;
//     if(id){
//         return res.status(404).send("student not permitted")
//     }
//     const arrayindex=student.findIndex(s=>s.id==id) ;
//     const data=student.arrayIndex;
//     res.json.data;
// });
// app.get("/student",(res,req)=>{
//     const branch=req.query.branch;
//     if(branch){
//         return res.json(student)
//     }
//     const foundStudent=student.filter(s=>s.branch==branch) ;
//     res.json.foundStudent;
// });
// app.post("/student/register",(res,req)=>{
//     const data=res.body
//     console.log("<<<",req.body)
//     if(!data){
//         return res.status(404).send("please provide student data")
//     }
//     student.push(data);
//     res.json(student)
// })
// //start a server
// app.listen(PORT,()=>{
//    console.log("server is listening to port 8000")
// })
//REST = Representational State Transfer
//API = Application Programming Interface
const express = require("express");
const app = express();
const PORT = 8000;

// Middleware
app.use(express.json());

// Sample student data
const students = [
  { id: 1, name: "reema", branch: "CSE" },
  { id: 2, name: "charu", branch: "ECE" },
  { id: 3, name: "anaya", branch: "IT" }
];

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to Home Page");
});
// Get all students
app.get("/student", (req, res) => {
  res.json(students);
});
//get used to get the student data
app.get("/student/:id", (req, res) => {
  const id = Number(req.params.id);
  const student = students.find(s => s.id === id);
  if (!student) {
    return res.status(404).send("Student not found");
  }
  res.json(student);
});
//post is used to ragister student
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
//put isuse to update student data
app.put("/student/:id", (req, res) => {
  const id = Number(req.params.id);
  const updatedData = req.body;
  const student = students.find(s => s.id === id);
  if (!student) {
    return res.status(404).send("Student not found");
  }
  student.name = updatedData.name || student.name;
  student.branch = updatedData.branch || student.branch;
  res.json({
    message: `Student ${id} updated successfully`,
    student
  });
});
//server start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});