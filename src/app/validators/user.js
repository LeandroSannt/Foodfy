const User = require('../models/usersModel')

function checkAllFields(body){
    const keys =Object.keys(body)

        for(key of keys){
            if(body[key] == ""){
                return {
                    user: body,
                    error:'Preencha todos os campos'
                }
            }
        }
}

async function post(req,res,next){

    const fillAllFields =  checkAllFields(req.body)
        if(fillAllFields){
            return res.render("admin/users/create",fillAllFields)
        }
    
        let { email, password, passwordRepeat} = req

        const user = await User.findOne({
            where:{email},
        })

        if(user) return res.render("admin/user/create",{
            user: body,
            error:'Preencha todos os campos'

        })

        if (password != passwordRepeat)
            return res.render("admin/user/create",{
                user: req.body,
                error:'Senha não é igual'
            })

        next()
}

module.exports={
    post
}