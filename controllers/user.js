import user from '../database/user.js'
import bycrpt from 'bcryptjs'
import jwt from 'jsonwebtoken'



export const loginForm = ( req, res) =>{
    res.render('authenticatoin/login')
}
export const login= async (req, res) =>{
    const{   email, password}=req.body;
    const loggedUser =await user.findOne({email})

    const isCorrectPassword = bycrpt.compareSync(password,loggedUser.password)

    if(! isCorrectPassword){
        return res.send('incorrect email or incorrect password')
    }
    // console.log({ 
    //  email, 
    //  password,
    //  encryptedPassward: loggedUser.password,
    //  isCorrectPassword
    // })
    const data ={
        _id: loggedUser._id,
        email: loggedUser.email,
        
    }
    const jwtToken= jwt.sign(data,process.env.JWT_SECTRET)
    res.cookie('token',jwtToken)
    res.redirect('/doctor')
    console.log(data)
}