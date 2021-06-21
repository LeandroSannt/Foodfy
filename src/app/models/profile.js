const db =require("../lib/configs/db")
const crypt = require("crypto")

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
    
          const values = [
            data.name,
            data.email,
            newPassword,
            data.is_admin || false,
          ];
    
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