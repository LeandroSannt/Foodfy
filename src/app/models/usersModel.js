const db =require("../lib/configs/db")
const { hash } = require('bcryptjs')
const fs = require("fs")


module.exports={
    async create(data){
        const query = `
            INSERT INTO users (
                name,
                email,
                password,
                cpf_cnpj,
                cep,
                adress
            )VALUES($1, $2, $3, $4, $5, $6)
            RETURNING id
        `

        const password_hash =await hash(data.password, 8)
        
        const values = [
            data.name,
            data.email,
            password_hash,
            data.cpf_cnpj.replace(/\D/g,""),
            data.cep.replace(/\D/g,""),
            data.adress
        ]

        const results = await db.query(query, values)

        return results.rows[0].id
    },
}