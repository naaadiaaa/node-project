import express from 'express';
import mongoose from 'mongoose';
import { engine } from 'express-handlebars';
import dotenv from 'dotenv';
import methodOveride from 'method-override';
dotenv.config();

import route from './routes/subjects.js';
import studentsAcc from './routes/studentsAcc.js';
import doctorsAcc from './routes/doctorsAcc.js';
import { authentication } from './middleware/authentication.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.js'
import doctorsubj from './routes/doctor.js';
import bodyParser from "body-parser";
import multer from "multer";
import path from "path";
import {fileURLToPath} from 'url';
import uploadfile from"./routes/upload.js"

// mongoose.connect(process.env.mongoConnection)
mongoose.connect(process.env.mongoConnection,{useNewUrlParser:true})
.then(()=>console.log('connected')).catch(err=>console.log('error ocured',err));
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(methodOveride('_method'))
app.use(cookieParser())
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
// app.set('views', './views');
app.use('/',authRoutes)
app.use('/admin', route);
app.use('/admin/studentAcc' , studentsAcc);
app.use('/admin/doctorAcc' , doctorsAcc);
app.use('/doctor',authentication,doctorsubj)
app.set('views',path.resolve(__dirname,'views'));
app.use(bodyParser.urlencoded({extended:true}));
app.use('/',uploadfile);

app.listen(process.env.port, () => {
    console.log(`app is running in http://localhost:${process.env.port}`)
});
