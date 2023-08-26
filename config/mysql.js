const mySql=require('mysql2');

const db=mySql.createConnection({
    host:'127.0.0.1',
    database:'task',
    user:'root',
    password:'Jenish@123'
});

module.exports=db;