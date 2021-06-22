function onlyUser(req,res,next){
    if(!req.session.userId)
        return res.redirect("/admin/login")

    next()
}

function permitAdmin(req,res,next){
    if(req.session.isAdmin == true)
        return res.render("admin/session/login",{
            authorization: "Acesso negado !"
        })
        
    next()
}

module.exports = {
    onlyUser,
    permitAdmin
    
}