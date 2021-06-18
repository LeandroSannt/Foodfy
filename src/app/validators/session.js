var User =require("../models/usersModel")
const {compare } = require("bcryptjs")


async function login(req,res,next){
    const {email,password} = req.body

    const user = await User.findOne({where:{email}})

    if (!user) return res.render("admin/session/login",{
        user:req.body,
        error: "Usuario não encontrado"
    })

    const passed = await compare(password, user.password)

    if (!passed) return res.render("admin/session/login",{
        user: req.body,
        error: "Senha incorreta."
    })

    req.user = user
    next()
}

module.exports = {
    login,

}