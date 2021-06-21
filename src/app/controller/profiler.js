const Profile = require('../models/profile')
const mailer = require("../lib/configs/mailer")

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
    
            await mailer.sendMail({
            to: profile.email,
            from:"recsenha0000@hotmail.com",
            subject: "Seja bem vindo ao Foodfy",
            html: `
            <h2>Seja bem-vindo!</h2>
            <p>Aqui está sua informação de acesso, seu email e senha gerados pelo sistema e são temporários, você pode alterá-los em seu perfil.</p> 
            <h5>Email:</h5>
            ${profile.email}
            <h5>Senha:</h5>
            ${profile.password}
            <p>
            <a href ="http://localhost:5000/admin/users" target ="_blank">
                RECUPERAR SENHA
            </a>
            </p>
            `,
            });

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