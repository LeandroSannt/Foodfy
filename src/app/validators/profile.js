const User = require("../models/usersModel")
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

    let {email} = req.body

    const user = await User.findOne({
        where:{email}
    })

    if(user) return res.render("admin/profile/create",{
        user: req.body,
        error:'Usuario ja existe'
    })

    next()

    }catch(err){
        console.error(err)
    }
    
}

async function update(req,res,next){
    const fillAllFields =  checkAllFields(req.body)
        if(fillAllFields){
            return res.render("admin/profile/index",fillAllFields)
        }

        const {id, password,passwordRepeat,email} = req.body

        if(password !=  passwordRepeat) return res.render("admin/profile/index",{
            user:req.body,
            error:"Senha e confirmação de senha nao batem"
        })

        const user = await User.findOne({where:{id}})
        console.log(User.findOne({where:{id}}))

        const passed = await compare(password,user.password)

        if(!passed) return res.render("admin/profile/index",{
            user:req.body,
            error:"Senha incorreta."
        })

        req.user = user 
        
        next()
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

module.exports={
    post,
    update,
    show
}