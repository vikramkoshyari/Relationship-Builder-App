const express = require('express')
const path =require('path')
const app = express();
app.use(express.static(path.join(__dirname, './relationship-app/build')))


app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, './relationship-app/build','index.html'));
})
app.listen(9000,()=>{
    console.log('server up at 9000')
})