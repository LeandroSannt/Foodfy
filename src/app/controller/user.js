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
            
            let results = await User.create(req.body)
            const chefId = results.rows[0].id
            return res.redirect(`/admin/users/profile/${chefId}`)

        }catch(err){
            console.error(err)
        }
    },

    async profile(req,res){

        const {user} = req

        return res.render('admin/users/profile',{user})    
        

    },



    
}