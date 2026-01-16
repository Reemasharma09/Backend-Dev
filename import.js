const fs= require("fs");
function logActivity(message){
    const timestamp=new Date().toLocaleString();
    const logMessage=`[${timestamp}]-${message}\n`;
    //append file
    fs.appendFile('activity.log',logMessage,(err)=>{
        if(err)
            console.log("failed to write");
    });
}
module.exports={logActivity};
