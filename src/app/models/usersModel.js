const db =require("../lib/configs/db")
const { hash } = require('bcryptjs')
const fs = require("fs")


module.exports={
    
    async findOne(filters){
        let query = "SELECT * FROM users"

        Object.keys(filters).map(key =>{
            query = `
            ${query}
            ${key}
            `
            Object.keys(filters[key]).map(field =>{
               query = `${query} ${field} = '${filters[key][field]}'`
            })
        })
        const results = await db.query(query)
        return results.rows[0]
    },

       async findUser(id) {
        try {
          const results = await db.query(`SELECT * FROM users WHERE id = $1`, [id]);
    
          return results.rows[0];
        } catch (err) {
          console.log("erro no findUser");
          console.error(err);
        }
      },
    
   
   async create(data){
    var query =`
    INSERT INTO users (
        name,
        email,
        password,
        is_admin
    )VALUES($1, $2, $3, $4)
    RETURNING id
    `

    const password_hash =await hash(data.password, 8)

    const values = [
        data.name,
        data.email,
        password_hash,
        data.is_admin || false
    ]
       return db.query(query,values)
    },

}