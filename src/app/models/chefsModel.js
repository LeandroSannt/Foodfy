var {age, date} =require("../lib/configs/utils")
var db = require("../lib/configs/db")
const Recipes = require("../models/recipesModel")
const fs = require('fs')


module.exports= {

    all(){
        return db.query(` 
            SELECT chefs.*, count(recipes) AS total_recipes
            FROM chefs
            LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
            GROUP BY chefs.id`)
    },

    create(data, file_id) {
        const query = `
        INSERT INTO chefs (
            name,
            created_at,
            file_id
        ) VALUES ($1, $2, $3)
        RETURNING id
        `

        const values = [
            data.name,
            date(Date.now()).created,
            file_id
        ]

        return db.query(query, values)
    },

    async find(id) {
        try {
            const results = await db.query(`SELECT chefs.*, 
            count(recipes) AS total_recipes
            FROM chefs 
            LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
            WHERE chefs.id = $1
            GROUP BY chefs.id
            `, [id])

            return results.rows[0]
        } catch (err) {
            console.log(err)
        }
    },

    allfind(id){
        return db.query(`
        SELECT chefs.*, 
        count(recipes) AS total_recipes
        FROM chefs 
        LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
        WHERE chefs.id = $1
        GROUP BY chefs.id`,[id])
         
     },

    async files(id) {
        try {
            const results = await db.query(`SELECT files.path FROM files WHERE files.id = $1 `, [id])

            return results.rows
        } catch (err) {
            console.log(err);
        }
    },

    findRecipes(id){
       return db.query(`
       SELECT *
       FROM chefs 
       LEFT JOIN recipes
       ON (recipes.chef_id = chefs.id) 
       WHERE chefs.id = $1`,[id])
    },

    update(data, file_id) {
        const query = ` 
        UPDATE chefs SET
        name=($1),
        file_id=($2)
        WHERE id = $3 
        `

        const values = [
            data.name,
            file_id,
            data.id
        ]

        return db.query(query, values)
    },
    async paginate(params) {
        let { filter, limit, offset } = params

        let query = '',
            filterQuery = '',
            totalQuery = `(
                SELECT count(*)
                FROM chefs 
            ) AS total`

        if (filter) {
            filterQuery = `
                WHERE chefs.name ILIKE '%${filter}%'
            `

            totalQuery = `(
                SELECT count(*)
                FROM chefs 
                ${filterQuery}
            ) AS total`
        }

        query = `
        SELECT chefs.*, count(recipes) AS total_recipes,
        ${totalQuery}
        FROM chefs 
        ${filterQuery}
        LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
        GROUP BY chefs.id
        LIMIT $1 OFFSET $2
        `

        const results = await db.query(query, [limit, offset])

        return results.rows
    },

    async getChefAvatar(id) {
        try {
            const results = await db.query(`
        SELECT files.*
        FROM files 
        LEFT JOIN chefs ON 
        (chefs.file_id = files.id)
        WHERE chefs.id = $1
        `, [id])

            return results.rows[0]
        } catch (err) {
            console.log(err)
        }
    },
    async findChefRecipes(id) {
        try {
            const results = await db.query(`
            SELECT *
            FROM chefs 
            LEFT JOIN recipes
            ON (recipes.chef_id = chefs.id) 
            WHERE chefs.id = $1
            `, [id])

            return results.rows
        } catch (err) {
            console.log(err)
        }
    },

    async delete(id) {
        try {
            await db.query(`DELETE FROM chefs WHERE id = $1`, [id])

            const results = await db.query(`
            SELECT files.* FROM files
            LEFT JOIN chefs ON (chefs.file_id = files.id)
            WHERE chefs.id = $1`, [id])
            const file = results.rows

            file.map(async file => {
                fs.unlinkSync(file.path)

                await db.query(`DELETE FROM files 
                WHERE id = $1`, [file.id])
            })
        } catch (err) {
            console.log(err)
        }
    },
}

