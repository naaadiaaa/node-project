import doctorAcc from "../database/doctorAcc.js";


export const index = async (req, res) => {
    const subviwe = await doctorAcc.find().lean();


    res.render('doctorsAcc/index', { subviwe });
};


export const create = async (req, res) => {

    res.render('doctorsAcc/create');
};


export const store = async (req, res) => {

    const { username, password } = req.body;
    await doctorAcc.create({
        username,
        password,

    });
    res.redirect('/admin/doctorAcc');
};



export const show = async (req, res) => {

    const { id } = req.params;

    const singleAcc = await studentAcc.findById(id).lean();

    res.render('studentsAcc/show', { studentAcc: singleAcc })

};