var {age, date} =require("../lib/configs/utils")
const fs = require("fs")
var db = require("../lib/configs/db")


module.exports= {

    create({filename,path}){
        const query = `
            INSERT INTO files (
                name,
                path
               
            )VALUES($1, $2)
            RETURNING id
        `
      
        const values = [
            filename,
            path
           
        ]
        return db.query(query, values)
    },

    findRecipeFiles(id){
        try {
            return db.query(`
                SELECT files.*, recipe_files.file_id AS file_id
                FROM files
                LEFT JOIN recipe_files ON (recipe_files.file_id = files.id)
                WHERE recipe_files.recipe_id = $1`, [id]
            )
        } catch (error) {
            throw new Error(error)
        }
    },

    createRecipeFiles({ recipe_id, file_id }) {
        try {
            const query = `
                INSERT INTO recipe_files(
                recipe_id,
                file_id
                )VALUES($1, $2)
                RETURNING id
            `
            const values = [
                recipe_id, 
                file_id
            ]
    
            return db.query(query, values)
        }catch(error){
            throw new Error(error)
        }
    },

    async delete(id){
            try {
                const result = await db.query(`SELECT * FROM files WHERE id = $1`, [id])
                const file = result.rows[0]
    
                fs.unlinkSync(file.path)
    
                await db.query(`DELETE FROM recipe_files WHERE recipe_files.file_id = $1`, [id])
                return db.query(`DELETE FROM files WHERE id = $1`, [id])
            } catch (error) {
                throw new Error(error)
            }
        }
}