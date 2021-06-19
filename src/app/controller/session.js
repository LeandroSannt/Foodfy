const User = require('../models/usersModel')
const crypto = require("crypto")
const mailer = require("../lib/configs/mailer")
const { hash } = require('bcryptjs')


module.exports ={

        logout(req,res){
            req.session.destroy()
            return res.redirect("/")
        },
    
        login(req,res){
            req.session.userId = req.user.id
            return res.redirect(`/admin/recipes`)
        },
    
        loginForm(req,res){
            return res.render("admin/session/login")
        },
    
        forgotForm(req,res){
            return res.render("admin/session/forgot-password")
        },
    
        async forgot(req,res){
            
            try{
                const user = req.user
    
            const token = crypto.randomBytes(20).toString("hex")

            
    
            let now = new Date()
            now = now.setHours(now.getHours() + 1)
    
            await User.update(user.id,{
                reset_token: token,
                reset_token_expires:now
            })

            console.log(reset_token)
    
            await mailer.sendMail({
                to:user.email,
                from:"recsenha0000@hotmail.com",
                subject:"Recuperação de senha",
                html: `<h2>Redefina sua senha </h2>
                <p>clique no link a baixo para recuperar a senha </p>
                <p>
                    <a href ="http://localhost:5000/admin/password-reset?token=${token}" target ="_blank">
                    RECUPERAR SENHA
                    </a>
                </p>
                `
            })
            
            return res.render("admin/session/forgot-password",{
                success: "Verifique seu email para resetar sua senha!"
            })

            }catch(err){
                console.error(err)
            }  
        },
    
        resetForm(req,res){
            console.log(req.query.token)
            return res.render("admin/session/password-reset",{token:req.query.token})
        },
        
        async reset(req,res){
            const {password, token} = req.body
            const user = req.user
            try{
    
                const newPassword = await hash(password, 8)
                await User.update(user.id ,{
                    password: newPassword,
                    reset_token: "",
                    reset_token_expires: ""
                })
    
                return res.render("admin/session/login",{
                    user:req.body,
                    success: "Senha atualizada, faça seu login"
                })
                
            }catch(err){
                console.error(err)
                return res.render("admin/session/password-reset",{
                    token,
                    error: "Erro inesperado, tente novamente"
                })
            }
    
        }
    }



