import { Router } from "express";
import picModel from "../database/fileuploads.js"
import multer from "multer"
import mongoose from "mongoose";
import express from "express";

import {fileURLToPath} from 'url';
import path from "path";
import {file }from "../controllers/file.js";

const route = new Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
var pathh = path.resolve(__dirname,'public');
route.use(express.static(pathh));
var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/uploads')
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})
var upload = multer({storage:storage})
route.get('/upload', file);
  route.post('/upload',upload.single('pic'),(req,res)=>{
    var x = '/uploads'+req.file.originalname;
    var temp = new picModel({
        picpath:x
    })
    temp.save()
  .then(() => {
    res.redirect('/upload');
  })
  .catch((err) => {
    console.log(err);
  });
})



export default route;
