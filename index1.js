const fs=require("fs");
fs.readFile("data.txt","utf8",(err,data)=>{
    if(err){
        console.log("error found");
    }
    else{
        console.log(data);
    }
});