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

    let {email, password, passwordRepeat} = req.body
    

    const user = await User.findOne({
        where:{email}
    })

    if(user) return res.render("admin/users/create",{
        user: req.body,
        error:'Usuario ja existe'
    })

    if (password != passwordRepeat)
        return res.render("admin/users/create",{
            user: req.body,
            error:'Senha não é igual'
        })

    next()
}


async function show(req,res,next){
    try{
        const {userId: id} = req.session

        const user = await User.findOne({where: {id} })

        if(!user) return res.render("user/register",{
            error:"Usuario não encontrado"
        })

        req.user = user

        console.log(req.user)

        next()

    }catch(err){
        console.error(err)
        
    }
    
}

module.exports={
    post,
    show
}