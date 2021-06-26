var {age, date} =require("../lib/configs/utils")
var db = require("../lib/configs/db")
const fs = require('fs')


module.exports= {

     recipesusers(id){
       return db.query(`
       SELECT recipes.*, chefs.name AS chefs_name
       FROM recipes
       LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
       LEFT JOIN users ON (recipes.user_id = users.id)
       WHERE  user_id = ${id}
       ORDER BY created_at desc`
        )
    },

    all(){
        return db.query(`
        SELECT recipes.*, chefs.name AS chefs_name
       FROM recipes
       LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
       ORDER BY created_at desc`
         )
     },

     async findOne(filters){
        let query = "SELECT * FROM recipes"

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

    create(data){
    var query =`
        INSERT INTO recipes(
            title,
            ingredients,
            preparation,
            information,
            created_at,
            chef_id,
            user_id
        )VALUES($1,$2,$3,$4,$5,$6,$7)
        RETURNING id
    `

        var values= [
            data.title,
            data.ingredients,   
            data.preparation,
            data.information,
            date(Date.now()).iso,
            data.chef,
            data.user_id
        ]
       return db.query(query,values)
    },
    

    find(id){
       return db.query(`
        SELECT  recipes.*, chefs.name AS chef_recipes 
        FROM recipes 
        LEFT JOIN chefs ON(recipes.chef_id = chefs.id)
        WHERE  recipes.id = $1`,[id])
        
    },

    async findRecipeOne(filters,id){
        let query = "SELECT recipes.*, chefs.name AS chef_recipes from recipes "

        Object.keys(filters).map(key =>{
            query = `
            ${query}
            LEFT JOIN chefs ON(recipes.chef_id = chefs.id)
            ${key} recipes.` 
            Object.keys(filters[key]).map(field =>{
               query = `${query} ${field} = '${filters[key][field]}'`
            })
        })
        const results = await db.query(query)
        return results.rows[0]
    },
    
    findBy(filter){
       return db.query(`
        SELECT recipes.*, chefs.name AS chefs_name
        FROM recipes
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        WHERE recipes.title ILIKE '%${filter}%'
        OR chefs.name ILIKE '%${filter}%'`) 
    },

    filter(filter, callback) {
        db.query(`SELECT *, recipes.id AS recipe_id
        FROM recipes
        INNER JOIN chefs 
        ON (recipes.chef_id = chefs.id)
        WHERE recipes.title ILIKE '%${filter}%'
        OR chefs.name ILIKE '%${filter}%'
        `, 
        (err, results) => {
            if (err) throw `Database error: ${err}`

            callback(results.rows)
        })
    },

     update(data){
        var query = `
        UPDATE recipes SET
            title = ($1),
            ingredients = ($2),
            preparation = ($3),
            information = ($4),
            chef_id = ($5)
            WHERE id = $6
            `
        var values =[
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            data.chef,
            data.id
        ]
      return  db.query(query, values)
    },  

    async updatee(id,fields){
        let query = "UPDATE recipes SET"

        Object.keys(fields).map((key,index,array)=>{
            if((index+1) < array.length){
                query = `${query} 
                    ${key} = '${fields[key]}',
                `
            }else{
                query= `${query}
                ${key} = '${fields[key]}'
                WHERE id = ${id}
                `
            }
        })
        await db.query(query)
        return
    },

    async delete(id) {
        const results = await db.query(`
        SELECT files.*, recipe_id, file_id
        FROM files 
        LEFT JOIN recipe_files ON (recipe_files.file_id = files.id)
        WHERE recipe_files.recipe_id = $1
        `,[id])
        const files = results.rows

        files.map(async file => {
            fs.unlinkSync(file.path)

            await db.query(`
            DELETE FROM files 
            WHERE files.id = $1
            `, [file.id])
        })       
        
        await db.query(`
        DELETE FROM recipe_files 
        WHERE recipe_files.recipe_id = $1`, [id])

        return db.query(`
        DELETE FROM recipes 
        WHERE id = $1`, [id])
    },

    chefSelectOptions(){
       return db.query(`SELECT name,id FROM chefs`)
    },

    async paginate(params) {
        let { filter, limit, offset } = params

        let query = '',
            filterQuery = '',
            totalQuery = `(
                SELECT count(*)
                FROM recipes 
            ) AS total`

        if (filter) {
            filterQuery = `
                WHERE recipes.name ILIKE '%${filter}%'
            `

            totalQuery = `(
                SELECT count(*)
                FROM recipes 
                ${filterQuery}
            ) AS total`
        }

        query = `
        SELECT recipes.*,
        chefs.name AS chef_name,
        ${totalQuery}
        FROM recipes
        ${filterQuery}
        LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
        LIMIT $1 OFFSET $2
        `
        const results = await db.query(query, [limit, offset])

        return results.rows
    },

    allfiles(id){
        return db.query(`
        SELECT files.*, recipe_files.file_id AS file_id
        FROM files 
        LEFT JOIN recipe_files ON (recipe_files.file_id = files.id)
        WHERE recipe_files.recipe_id = $1
      `,[id]);
    },

    async files(id) {
        try {
            const results = await db.query(`SELECT files.* 
            FROM files
            LEFT JOIN recipe_files 
            ON (files.id = recipe_files.file_id)
            WHERE recipe_files.recipe_id = $1`, [id])

            return results.rows
        } catch (err) {
            console.log(err);
        }
    },
    async recipeFiles(id) {
        const query = `
        SELECT *, (
            SELECT files.path
            FROM files
            LEFT JOIN recipe_files 
            ON (files.id = recipe_files.file_id)
            WHERE recipe_files.recipe_id = $1
            LIMIT 1
            ) 
        FROM recipes 
        LEFT JOIN recipe_files ON 
        (recipes.id = recipe_files.recipe_id)
        WHERE recipes.id = $1
        LIMIT 1
        `

        const results = await db.query(query, [id])

        return results.rows
    }
}    
    