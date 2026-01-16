//In Node.js,the os module means Operating System module, 
//get information about the computer’s operating system
 const os=require("os");
 console.log(os.platform());//Check Operating System Platform
 console.log(os.arch());//Check Architecture (32bit / 64bit)
 console.log(os.cpus());//Gives details of all CPU cores
  console.log(os.freemem());//Shows available memory
  console.log(os.totalmem());//Returns RAM in bytes
  console.log(os.hostname());
   console.log(os.type());