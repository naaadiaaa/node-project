import department from "../models/department.js";
import students from "../models/students.js";
import subject from "../models/subject.js";

export const index = async(req,res)=>{
    const subjects = await subject.find({ doctor: req.user._id},{ subName : 1} ).lean( );
    res.render('subjects/index', { subjects});
};

export const create = async(req,res) => {
    const departments = await department.find().lean();
    res.render('subjects/create', { departments});
};

export const store = async(req,res) => {
    const { subName , subCode , subDepartment ,subPrevious } = req.body;
    await subject.create({
        subName ,
        subCode ,
        subDepartment,
       
        subPrevious,
         doctor: req.user._id,
        student: req.user._id,
        
    });
    
    res.redirect('/subjects');
    
};

export const show = async(req , res) => {
    const { _id } = req.params;
   
    const singleSubject = await subject.findById(_id).populate('subDepartment').lean();

    res.render('subjects/show', {subject: singleSubject} );
};


export const edit = async (req, res) => {
    const { _id } = req.params;
    const editFormSubject = await subject
      .findById(_id).lean(); 
    res.render("subjects/edit",{department, subject: editFormSubject});
  };

  export const update = async(req,res) => {
    const { subName , subCode , subDepartment ,subPrevious } = req.body;
    const { _id } = req.params;
    await subject.findByIdAndUpdate(_id, {$set: {subName , subCode , subDepartment ,subPrevious }})
    
    res.redirect('/subjects');
    
};


export const deleteOne = async(req,res ) =>{
    const { _id }= req.params;
    
    await subject.findByIdAndDelete(_id);
    
  
    return res.redirect('/subjects');
  
  };
