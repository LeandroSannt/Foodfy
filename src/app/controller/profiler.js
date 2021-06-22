const User = require("../models/usersModel")
const Profile = require('../models/profile')

const crypt = require("crypto")
const { hash } = require('bcryptjs')

module.exports ={
    async index(req,res){

        const {user} = req

        return res.render('admin/profile/index',{user})   
    },

    async create(req,res){

        return res.render('admin/profile/create')   
    },

    async post(req, res) {
        try {
            const ProfileId = await Profile.create(req.body);
            const profile = await Profile.findUser(ProfileId.id);

            //req.session.userId = userId;

            return res.render("admin/profile/create",{
                success: `Senha enviada para o email, ${profile.email}`
            })
        } catch (err) {
            console.error(err);
        }
    },

    async update(req,res){
        try{
            const { user } = req
            let {name, email, password} = req.body

            password =await hash(password, 8)

            await User.update(user.id,{
                name,
                email,
                password
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