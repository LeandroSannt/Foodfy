const User = require('../models/usersModel')
const { hash } = require('bcryptjs')

module.exports ={

    async list(req,res){
        return res.render('admin/users/index')    
    },
    
    async create(req,res){
        return res.render('admin/users/create')    
    },

    async post(req,res){
        try{
            const userId = await User.create(req.body)
            req.session.userId = userId

            return res.render(`admin/session/login`,{
                success: "Conta registrada com sucesso"
            })
        }catch(err){
            console.error(err)
        }
    },

    async edit(req,res){

        const {user} = req

        return res.render('admin/users/edit',{user})    
        
    },
    async put(req,res){

        const {user} = req

        return res.render('admin/users/edit',{user})    
        
    },
}