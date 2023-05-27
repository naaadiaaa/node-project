import { Router } from "express";


import{register,registerForm} from '../controllers/students.js'
import { studentlog , studentLoginForm} from '../controllers/students.js'


const router = new Router();

router.get('/registerstudent',registerForm);
router.post('/registerstudent',register);

router.get('/studentlog' , studentLoginForm);
router.post('/studentlog' , studentlog);


export default router;