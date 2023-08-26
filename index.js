const express = require('express');
const port = 8008;
const app = express();
const db = require('./config/mysql');
const path = require('path');
app.use(express.urlencoded());
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'view'));
app.use(express.static('assets'))
app.use('/uploads',express.static(path.join(__dirname,'uploads')));

app.get('/',async(req,res)=>{
    return res.render('add_details');
})

app.use('/',require('./router/index'));

app.listen(port,(err)=>{
    if(err)
    console.log('server was not running');
    else
    console.log('server was running in port',port);
    db.connect((err)=>{
        if(err){
            console.log('db not connected ',err);
        }else{
            console.log('db connected ');
        }
    })
})