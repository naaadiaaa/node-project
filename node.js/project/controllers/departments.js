import department from "../models/department.js";


export const index = async (req, res) => {
    const departments = await department.find().lean();
    console.log(departments);
    res.render("departments/index", { departments });
  };

  export const create = async (req, res) => {
   
    res.render("departments/create");
  };
  
  export const store = async (req, res) => {
    const { name, code} = req.body;
    await department.create({
      name: name,
      code,
      
    });
  
    res.redirect("/departments");
    
  };




  export const show = async (req, res) => {
    
    const { _id } = req.params;
    console.log(_id);
   
    const singleDepartment = await department
      .findById(_id).lean(); 
    console.log(singleDepartment);
    res.render("departments/show", { department: singleDepartment });
  };


  export const edit = async (req, res) => {
    const { _id } = req.params;
    const editFormDepartment = await department
      .findById(_id).lean(); 
    res.render("departments/edit",{department: editFormDepartment});
  };


  export const update = async (req, res) => {
    const { name, code} = req.body;
    const { _id }= req.params;
     await department.findByIdAndUpdate(_id, { 
      $set: {name, code },
    });

    res.redirect("/departments");

  };


export const deleteOne = async(req,res ) =>{
  const { _id }= req.params;
  
  await department.findByIdAndDelete(_id);
  

  return res.redirect('/departments');

};

