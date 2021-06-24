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

module.exports = {
    onlyUser,
    permitAdmin
    
}