const User = require('../models/usersModel')
const { hash } = require('bcryptjs')

module.exports ={

    async list(req,res){
        let results = await User.all()
        const users = results.rows

        return res.render('admin/users/index',{users})    
    },

    async newAccount(req,res){
        return res.render("admin/users/account")
    },
    
    async create(req,res){
        return res.render('admin/users/create')    
    },

    async post(req,res){
        try{
            const userId = await User.create(req.body)
            req.session.userId = userId
            

            return res.render(`admin/recipes/index`,{
                success: "Conta registrada com sucesso"
            })
        }catch(err){
            console.error(err)
        }
    },

    async profile(req,res){
        const {user} = req

        return res.render('admin/users/profile',{user})   
    },

    async putprofile(req,res){
        return res.render('admin/users/profile')   
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