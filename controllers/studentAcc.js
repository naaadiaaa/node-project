import studentAcc from "../database/studentAcc.js";

export const index = async (req, res) => {
        const subviwe = await studentAcc.find().lean();
    res.render('studentsAcc/index', { subviwe });
    console.log(subviwe)
};


export const create = async (req, res) => {

    res.render('studentsAcc/create');
};


export const store = async (req, res) => {
    const { username, password, academicNumber } = req.body;
    await studentAcc.create({
        username,
        password,
        academicNumber,
    });
    res.redirect('/admin/studentAcc');
};



export const show = async (req, res) => {

    const { id } = req.params;

    const singleAcc = await studentAcc.findById(id).lean();

    res.render('studentsAcc/show', { studentAcc: singleAcc })

};