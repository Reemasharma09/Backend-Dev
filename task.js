const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));

const FILE = "student.json";

// read
function getStudents(){
    return JSON.parse(fs.readFileSync(FILE));
}

// write
function saveStudents(data){
    fs.writeFileSync(FILE, JSON.stringify(data,null,2));
}

// HOME -> form.ejs
app.get("/", (req,res)=>{
    res.render("form");
});

// ADD student
app.post("/add", (req,res)=>{

    const students = getStudents();

    students.push({
        name: req.body.name,
        branch: req.body.branch
    });

    saveStudents(students);

    res.redirect("/students");
});


// SHOW students + filter
app.get("/students",(req,res)=>{

    let students = getStudents();
    const branch = req.query.branch;

    if(branch){
        students = students.filter(s=>s.branch===branch);
    }

    res.render("student",{
        students,
        count:students.length
    });
});


// DELETE
app.get("/students/delete/:id",(req,res)=>{

    let students = getStudents();

    students = students.filter(s=>s.id!==req.params.id);

    saveStudents(students);

    res.redirect("/students");
});

app.listen(3000,()=>{
    console.log("Server running at http://localhost:3000");
});