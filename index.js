//const add=require('./add');  //older way to import
//console.log(add(2,2));

//import {add} from './add.js';
//console.log(add(1,2));

const url= require("url")
const http=require("http");
const server = http.createServer((req,res)=>{
    //res.writeHead(200,{"Content-Type":"application/json"});
    //res.end("response is closed");
    const timestamp= new Date().toLocaleString();
    const log=`$["user is requesting at:]`
    const parsedurl= url.parse(req.url, true)
    console.log(parsedurl)


    switch(req.url){
        case"/":
        res.writeHead(200,{"content-type":"text/html"})
        res.end("<h1> welcome to home page</h1>")
        break;
        case"/about":
        res.writeHead(200,{"content-type":"text/html"})
        res.end("<h1> welcome to about e page</h1>")
        default:
        res.writeHead(404,{"content-type":"text/html"})
        res.end("<h1> welcome to home page</h1>")
    }
})
server.listen(8000,()=>{
   console.log("server is running");
});