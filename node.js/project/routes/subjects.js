import { Router } from "express";
import { create, edit,update,deleteOne,index, show, store } from "../controllers/subject.js";

import department from "../models/department.js";
import subject from "../models/subject.js";


const router = new Router();

router.get('/',index);

router.get('/create',create);

router.get('/:_id/edit',edit);

router.put('/:_id',update);

router.delete('/:_id', deleteOne)


router.post('/',store);

router.get('/:_id', show);



export default router; 