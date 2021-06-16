const User = require('../models/usersModel')
module.exports ={

    async list(req,res){
        return res.render('admin/users/index')    
    },
    
    async create(req,res){

        

        return res.render('admin/users/create')    
        

    },

    async post(req,res){

        const userId = await User.create(req.body)

        req.session.userId = userId

        return res.render('/users/create')    

    },

    async profile(req,res){

        

        return res.render('admin/users/profile')    
        

    },



    
}