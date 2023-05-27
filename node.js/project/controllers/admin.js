import doctors from'../models/doctors.js'
import admin from '../models/admin.js';

import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';

export const registerFormadmin=(req,res)=>{
    res.render('authentication/registeradmin');
    }

export const registeradmin=async (req,res)=>{
    const {username,email,password}=req.body;
    console.log(username,email,password);
    const salt = bcrypt.genSaltSync(10);
    const encryptedpassword = bcrypt.hashSync(password, salt);
    //console.log(encryptedpassword);
    await admin.create({username,email,password:encryptedpassword});
    res.redirect('/adminlog');
  };

  export const loginFormadmin = (req , res) => {
    res.render('authentication/adminlog');
};

export const loginadmin = async (req , res) => {
    const { email,password } = req.body;

    const loggedUser = await admin.findOne({ email });

    

    const isCorrectPassword = bcrypt.compareSync(password , loggedUser.password);

    if ( !isCorrectPassword){
    return res.send('Incorrect Credentials');
    }

    const data  ={
        _id: loggedUser._id,
        email: loggedUser.email,
    };

    const jwtToken = jwt.sign(data , process.env.JWT_SECRET);
    
    
   res.cookie('token' , jwtToken);
    res.redirect('/adminchoices');
};