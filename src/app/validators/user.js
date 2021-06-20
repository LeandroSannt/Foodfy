const User = require('../models/usersModel')
const  {compare} = require("bcryptjs")

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
    try{
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

    }catch(err){
        console.error(err)
    }
    
}

async function update(req,res,next){
    try{

        const {email , id} = req.body

        const user = await User.findOne({where:{id}})



        const fillAllFields =  checkAllFields(req.body)
        if(fillAllFields){
            return res.render(`admin/users/${id}/edit`,fillAllFields)
        }

        

        req.user = user 
        
        next()

    }catch(err){
        console.error(err)
    }


}

async function show(req,res,next){
    const {userId: id} = req.session

        const user = await User.findOne({where: {id} })

        if(!user) return res.render("user/register",{
            error:"Usuario não encontrado"
        })

        req.user = user

        next()
}

async function find(req,res,next){
    let user = await User.findUser(req.params.id);

        if (!user) return res.render("admin/users/index",{
            error:"Usuário não encontrado"
        })

        req.user = user

        next()
}

async function findUser(req,res,next){
    try{
        const {userId: id} = req.body
        const user = await User.findUser({where: {id} })

        if(!user) return res.render("user/register",{
            error:"Usuario não encontrado"
        })

        req.user = user

        next()

    }catch(err){
        console.error(err)
    }
}

module.exports={
    post,
    update,
    show,
    find
}