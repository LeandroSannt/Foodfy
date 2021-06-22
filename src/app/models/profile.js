const db =require("../lib/configs/db")
const crypt = require("crypto")
const { hash } = require('bcryptjs')
const mailer = require("../lib/configs/mailer")


module.exports={

    async create(data) {
        try {
          const query = `
          INSERT INTO users (
            name,
            email,
            password,
            is_admin
          ) VALUES ($1, $2, $3, $4)
          RETURNING id`;
    
          const newPassword = crypt.randomBytes(8).toString("hex");
          const password_hash =await hash(newPassword, 8)
        
          const values = [
            data.name,
            data.email,
            password_hash,
            data.is_admin || false,
          ];

          await mailer.sendMail({
            to: data.email,
            from:"lsn_cearamor@hotmail.com",
            subject: "Seja bem vindo ao Foodfy",
            html: `
            <h2>Seja bem-vindo!</h2>
            <p>Aqui está sua informação de acesso, seu email e senha gerados pelo sistema e são temporários, você pode alterá-los em seu perfil.</p> 
            <h5>Email:</h5>
            ${data.email}
            <h5>Senha:</h5>
            ${newPassword}
            <p>
            <a href ="http://localhost:5000/admin/login" target ="_blank">
                ALTERAR SENHA
            </a>
            </p>
            `,
            });

          const results = await db.query(query, values);
    
          return results.rows[0];
        } catch (err) {
          console.log("erro no create");
          console.error(err);
        }
      },
    async findUser(id) {
      try {
        const results = await db.query(`SELECT * FROM users WHERE id = $1`, [id]);
  
        return results.rows[0];
      } catch (err) {
        console.log("erro no findUser");
        console.error(err);
      }
    }
  }