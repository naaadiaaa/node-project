import { Router } from "express";


import{registerFormadmin,registeradmin , loginFormadmin , loginadmin } from '../controllers/admin.js'



const router = new Router();

router.get('/registeradmin',registerFormadmin);
router.post('/registeradmin',registeradmin);

router.get('/adminlog' , loginFormadmin);
router.post('/adminlog' , loginadmin);



export default router; 