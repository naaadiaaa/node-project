// import department from "../database/department.js";
// import subject  from "../database/sub.js";

// export const index =  async (req,res) =>{

//     const subjects = await subject.find({},{ name: 1}).lean();

//     console.log(subjects);
//     res.render('subjects/index', {subjects})
// };

// export const create = async (req, res) =>{
//     const departments =await department.find().lean()
//     console.log(departments)

//     res.render('subjects/create', {departments})
// }

// export const store = async (req,res) =>{
//     const{ name ,code , department  } =req.body;

//     await subject.create({
//         name,
//         code,
//         department
//     })

//     res.redirect('/doctor')
// }

// export const show = async (req, res) =>{
// //1. grab id
//     const {id} =req.params

//     //2. use id to get subject

//     const singleSubject = await subject.findById(id)
//     .lean()
//     //3. render show template

//     res.render('subjects/show', {subject: singleSubject})
// }
import subject from '../database/sub.js'
import courses from '../database/doctor.js'
import doctor from '../database/doctor.js';
export const index =async(req,res) =>{
    try {
        const courses = await subject.find({doctor:req.user._id},{name: 1}).lean();
        console.log( courses)
        res.render('authenticatoin/doctor',{courses})
        
    } catch (error) {
        console.log(error);
        res.status(500).send('حدث خطأ في الخادم');
        
    }


}
export const create = async (req,res)=>{
    try {
        const courses =await subject.find().lean()
        res.render('authenticatoin/create',{courses})
        
    } catch (error) {
        console.log(error);
        res.status(500).send('حدث خطأ في الخادم');
        
    }
   
    
}
export const store= async(req,res)=>{
    try {
        const{ name ,code   } =req.body;
        console.log (name)
        await doctor.create({
            name,
            code,
            doctor:req.user._id
            
        })
        res.redirect('/doctor')
    } catch (error) {
        console.log(error);
        res.status(500).send('حدث خطأ في الخادم');
        
    }
 

}
export const show = async (req, res) =>{
    //1. grab id
        const {id} =req.params
    
        //2. use id to get subject
    
        const singleSubject = await subject.findById(id)
        .lean()
        //3. render show template
    
        res.render('authenticatoin/show', {subject: singleSubject})
    }


