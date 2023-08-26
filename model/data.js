const multer=require('multer');
const path = require('path');
const upPath='/uploads/data'

const imgObj=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,'..',upPath));
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+'-'+Date.now());
    }
});

module.exports.upImage=multer({storage:imgObj}).single('image');
module.exports.upPath=upPath;

