const db = require('../config/mysql');
const bcrypt = require('bcrypt');
const model = require('../model/data');
const path = require('path');
const {body , validationResult} = require('express-validator');

module.exports.add_details = async (req,res)=>{
    try{
        return res.render('add_details')
    }
    catch(err){
        console.log(err);
    }
}

module.exports.innsertData = async (req,res)=>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            var errmsg = errors.mapped();
            res.render('add_details',{errors:errmsg,data:req.body});
        }

        let pass = await bcrypt.hash(req.body.password, 10);
        let image = '';
        if (req.file) {
            image = model.upPath + '/' + req.file.filename;
        }
        let sql = `insert into admin (name,email,password,phone,hobby,gender,image) values ("${req.body.name}","${req.body.email}","${pass}","${req.body.phone}","${req.body.hobby}","${req.body.gender}","${image}")`;
        db.query(sql, (err, data) => {
            if (err) {
                console.log("register user err in insert : ", err);
            } else {
                res.redirect('/')
            }
        })
    }
    catch(err){
        console.log(err);
    }
}

module.exports.view_details = async (req,res)=>{
    try{
        db.query('select * from admin',(err,data)=>{
            if(data){
                return res.render('view_details',{
                    data
                })
            }
            else{
                console.log("something wrong",err);
            }
        })
    }
    catch(err){
        console.log(err);
    }
}

module.exports.allDetail_view = async (req,res)=>{
    try{
        db.query(`select * from admin where id=${req.params.id}`,(err,data)=>{
            if(data){
                return res.render('allDetail_view',{
                    data
                });
            }
            else{
                console.log(err);
            }
        });
    }
    catch(err){
        console.log(err);
    }
}