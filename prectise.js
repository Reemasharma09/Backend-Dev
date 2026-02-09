const express=require('express')
const app=express()
app.get('/',(req,res)=>{
    res.send("fetch or read data")
})
app.post('/',(req,res)=>{
   res.send("create the data")
})
app.put('/',(req,res)=>{
    res.send("update the data")
})
app.delete('/',(req,res)=>{
    res.send("delete the data")
})
app.listen(8000,()=>{
    console.log("server is running");
})
//app.get is use to fetch the data ..once the data is cretaed it is not changed also get is safe to fetch data.
//app.post is use to create the data.data is cnaged and also it is not safe.
//app.put is use to update the data.data can be changed and also it is not safe.
//app.delete is use to delete the data.once data created it changes data and also not safe.