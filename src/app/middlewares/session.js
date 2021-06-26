const User = require('../models/usersModel')


function onlyUser(req,res,next){
    if(!req.session.userId)
        return res.redirect("/admin/login")

    next()
}

function permitAdmin(req,res,next){
    if(req.session.isAdmin == false)
        return res.render("not-found",{
            authorization: "Acesso negado! tente outra pagina"
        })
        
    next()
}

async function NotPermitDelete(req,res,next){

    let results = await User.all()
    const users = results.rows

    if (req.session.userId == req.body.id){
        return res.render("admin/users/index",{
            users,
            error: "Não é possivel deletar a propria conta"
        })
    }
    next()
}

module.exports = {
    onlyUser,
    permitAdmin,
    NotPermitDelete
    
}