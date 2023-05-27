import { Router } from "express";


import{register,registerForm , loginForm , login ,} from '../controllers/doctors.js'



const router = new Router();

router.get('/registerdoctor',registerForm);
router.post('/registerdoctor',register);

router.get('/login' , loginForm);
router.post('/login' , login);



export default router; 