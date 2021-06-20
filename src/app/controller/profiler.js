const User = require('../models/usersModel')
const user = require('./user')

module.exports ={
    async index(req,res){

        const {user} = req

        return res.render('admin/profile/index',{user})   
    },

    async update(req,res){
        try{
            const { user } = req
            let {name, email} = req.body


            await User.update(user.id,{
                name,
                email 
            })

            return res.render("admin/profile/index",{ 
                user:user,
                success:"Conta atualizada com sucesso"
            })
            
        }catch(err){
            console.error(err)
            const { user } = req
            return res.render('admin/profile/index',{
                user:user,
                error:"Email ja existe"
            })
        }
    }

}