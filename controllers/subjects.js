import departmentmodel from '../database/department.js';
import subjectmodel from '../database/sub.js';
import studentAcc from "../database/studentAcc.js";

export const admin=(req, res) => {
    res.render('layouts/admin')
}
export const index = async (req, res) => {
    let subjects = await subjectmodel.find({}, { name: 1 }).sort({ createdAt: 1 }).lean();
    res.render('subjects/index', { subjects })
}
export const create = async (req, res) => {
    const departments = await departmentmodel.find().sort({ createdAt: 1 }).lean();
    res.render('subjects/create', { departments })
}

export const store = async (req, res) => {
    const { SubjectName, SubjectCode, Department,previousSubjects,DoctorName } = req.body;
    await subjectmodel.create({
        name:SubjectName,
        code:SubjectCode,
        department: Department,
        previousSubjects:previousSubjects,
        doctor:DoctorName,
    });
    res.redirect('/admin/subjects');
};

export const show = async (req, res) => {
    const { _id } = req.params;
    const singlesubject = await subjectmodel.findById(_id).populate('department').lean();
    res.render('subjects/show', { singlesubject })
}

export const alldeps = async (req, res) => {
    const alldepartments = await departmentmodel.find().lean();
    const deps=[...alldepartments]
    res.render('departments/department', { deps });
}

export const createdepartment = async (req, res) => {
    const { DepartmentName, DepartmentCode } = req.body;
    const existingDepartment = await departmentmodel.findOne({ code: DepartmentCode });
    if (existingDepartment) {
        res.status(409).send("Department with this code already exists");
    } else {
        await departmentmodel.create({
            name: DepartmentName,
            code: DepartmentCode,
        });
        res.redirect('/admin/departments');
    }
}
export const addepartment =(req, res) => {
    res.render('departments/adddepartment')
}

export const edit = async (req, res) => {
    const { _id } = req.params;
    const editsubject = await subjectmodel.findById( _id ).populate('department').lean();
    const departments = await departmentmodel.find().sort({ createdAt: 1 }).lean();
    res.render('subjects/edit', { departments, subject: editsubject });
}
export const update = async (req, res) => {
    const { SubjectName, SubjectCode, Department,previousSubjects } = req.body;
    const { _id } = req.params;
    await subjectmodel.findByIdAndUpdate({ _id }, { $set: { name: SubjectName, code: SubjectCode, department: Department, previousSubjects: previousSubjects } });
    res.redirect('/admin/subjects');
}
export const deleteOne = async (req, res) => {
    const { _id } = req.params;
    await subjectmodel.findByIdAndDelete(_id);
    return res.redirect('/admin/subjects');
}
export const absence = async (req, res) => {
    let subjects = await subjectmodel.find({}, { name: 1 }).sort({ createdAt: 1 }).lean();
    res.render('absence/listsub',{subjects})
}

export const list = async (req, res) => {
    const subviwe = await studentAcc.find().lean();
    res.render('absence/liststudent',{subviwe});
};
