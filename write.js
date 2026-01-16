const fs= require("fs");
fs.writeFile("empty.txt","hellow reema",(err)=>{
    if(err){
        console.log("error occur");
    }
    else{
        console.log("file written");
    }
});