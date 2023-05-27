
import students from '../models/students.js';

import bcrypt from 'bcryptjs'

import jwt from 'jsonwebtoken';

export const registerForm = (req, res) => {
    res.render('authentication/registerstudent');
}

export const register = async (req, res) => {
    const { username, academicnumber, password } = req.body;
    console.log(username, academicnumber, password);
    const salt = bcrypt.genSaltSync(10);
    const encryptedpassword = bcrypt.hashSync(password, salt);
    //console.log(encryptedpassword);
    await students.create({ username, academicnumber, password: encryptedpassword });
    res.redirect('/studentlog');
}

export const studentLoginForm = (req, res) => {
    res.render('authentication/studentlog');
};

export const studentlog = async (req, res) => {
    const { username, password } = req.body;

    const loggedStudent = await students.findOne({ username });


    const isCorrectPassword = bcrypt.compareSync(password ,loggedStudent.password );
    
    if ( !isCorrectPassword){
        return res.send('Incorrect Credentials');
        }
    
        const data  ={
            _id: loggedStudent._id,
            username: loggedStudent.username,
        };
    
        const jwtToken = jwt.sign(data , process.env.JWT_SECRET);
        
        
       res.cookie('token' , jwtToken);
    res.send('/subjects');
};
