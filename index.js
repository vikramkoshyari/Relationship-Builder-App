const express = require('express')
const path =require('path')
const app = express();
const port = process.env.PORT || 5000;
app.use(express.static(path.join(__dirname, './relationship-app/build')))


app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, './relationship-app/build','index.html'));
})
app.listen(port,()=>{
    console.log(`server up at ${port}`)
})