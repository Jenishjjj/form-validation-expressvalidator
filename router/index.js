const express = require('express');
const router = express.Router();
const controller = require('../controller/controller');
const model = require('../model/data');
const { body , validationResult } = require('express-validator');


router.get('/add_details',controller.add_details);
router.post('/innsertData',model.upImage,[
    body('name').notEmpty().withMessage('Name is Required'),
    body('email').notEmpty().withMessage('Email is Required').isEmail().withMessage('Enter Vaid Email'),
    body('password').notEmpty().withMessage('Password is Required').isLength({min : 2}).withMessage('Password should have minimum 2 character'),
    body('confirm_pass').notEmpty().withMessage('Password is Required')
    .custom((value,{req})=>{
        if(req.body.password!=req.body.confirm_pass){
            throw new Error('Password not match');
        }
        return true;
    }),
    body('phone').notEmpty().withMessage('Phone is Required').isNumeric().withMessage('Enter Vaid Number').isLength({min:10}),
    body('gender').notEmpty().withMessage('gender is required'),
    body('hobby').notEmpty().withMessage('hobby is required'),
    body('image')
    .custom((value,{req})=>{
        if(!req.file){
            throw new Error('image is require');
        }
        return true;
    })
],controller.innsertData);

router.get('/view_details',controller.view_details);
router.get('/allDetail_view/:id',controller.allDetail_view);

module.exports = router;