var {age, date} =require("../lib/configs/utils")
var db = require("../lib/configs/db")


module.exports= {

     all(callback){

        db.query(`
        SELECT recipes.*, chefs.name AS chefs_name
        FROM recipes
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)`
        , (err, results)=> {
            if(err) throw `Database error ${err}`
            callback(results.rows)
    })
},

    create(data,callback){
    var query =`
        INSERT INTO recipes(
            image,
            title,
            ingredients,
            preparation,
            information,
            created_at,
            chef_id
        )VALUES($1,$2,$3,$4,$5,$6,$7)
        RETURNING id
    `

        var values= [
            data.image,
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            date(Date.now()).iso,
            data.chef
        ]
        db.query(query,values,function(err,results){
            if(err)throw `Database error ${err}`
            callback(results.rows[0])
        })
    },

    find(id,callback){
        db.query(`
        SELECT  recipes.*, chefs.name AS chef_recipes 
        FROM recipes 
        LEFT JOIN chefs ON(recipes.chef_id = chefs.id)
        WHERE  recipes.id = $1`,[id],function(err,results){
            if(err) throw `Database error ${err}`

            callback(results.rows[0])
        })
    },
    findBy(filter,callback){
        db.query(`
        SELECT recipes.*, chefs.name AS chefs_name
        FROM recipes
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        WHERE recipes.title ILIKE '%${filter}%'
        OR chefs.name ILIKE '%${filter}%'`, (err, results)=> {
            if(err) throw `Database error ${err}`
            callback(results.rows)
    })
        
    },


    update(data,callback){
        var query = `
        UPDATE recipes SET
            image = ($1),
            title = ($2),
            ingredients = ($3),
            preparation = ($4),
            information = ($5),
            chef_id = ($6)
            WHERE id = $7
            `
        var values =[
            data.image,
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            data.chef,
            data.id
        ]
        db.query(query, values, function (err , results){
            if(err) throw `Database Error! ${err}`
                callback()
        })
    },
    delete(id,callback){
        db.query(`DELETE  FROM recipes WHERE id = $1`,[id],function(err,results){
            if(err) throw `Database error ${err}`

            return callback()
        })

    },
    chefSelectOptions(callback){
        db.query(`
        SELECT name,id FROM chefs`,function(err,results){
            if(err) throw `Database error ${err}`

                callback(results.rows)
        })
    },

    paginate(params){
        const {filter,limit,offset,callback} = params

        let query ="",
            filterQuery ="",
            totalQuery=`(
            SELECT count(*) FROM recipes
        ) AS total `

            if(filter){
                filterQuery =`
                WHERE recipes.title ILIKE '%${filter}%'
                 OR chefs.name ILIKE '%${filter}%'
                `
                totalQuery =`(
                    SELECT count (*) FROM recipes
                     ${filterQuery}
                ) as total`
            }

            queryFind =`
            `

            query =`
            SELECT recipes. *, ${totalQuery}, chefs.name AS chefs_name
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            ${filterQuery}
            LIMIT $1 OFFSET $2`

            db.query(query,[limit,offset],function(err,results){
                if(err) throw "Database error"

                callback(results.rows)
            })
        } 
    }   