import { Router } from "express";
import { login, loginForm } from "../controllers/user.js";

// import { index,create,store,show } from "../controllers/doctor.js";
const router = new Router();
router.get('/',loginForm)
router.post('/login',login)
// router.get('/', index)

// router.get('/create', create)
// router.post('/', store)
// router.get('/:id', show)
export default router
