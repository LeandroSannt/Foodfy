var Chefs =require("../models/chefsModel")
var Recipes =require("../models/recipesModel")

var RecipeFiles =require("../models/recipeFiles")
var Files =require("../models/file")
const { files } = require("../models/chefsModel")

module.exports={
    
 async index(req, res) {
        try {
            let { filter, page, limit } = req.query
            page = page || 1
            limit = limit || 6
            let offset = limit * (page - 1)

            const params = { filter, page, limit, offset }

            const chefs = await Chefs.paginate(params)
            const pagination = {
                total: Math.ceil(chefs[0].total / limit),
                page
            }

            if (!chefs) return res.send("Chef not found")

            async function getImage(chefId) {
                let results = await Chefs.getChefAvatar(chefId)

                return results.path
            }

            const chefPromises = chefs.map(async chef => {
                chef.image = await getImage(chef.id)
                chef.image = `${req.protocol}://${req.headers.host}${chef.image.replace("public", "")}`

                return chef
            })
            const chefImage = await Promise.all(chefPromises)
            const isAdmin = req.session.isAdmin

            return res.render('admin/chefs/index', { chefs: chefImage, filter, pagination, isAdmin })
        } catch (err) {
            console.log(err)
        }
    },

create(req,res){
        return res.render("admin/chefs/create")
    },
    
async post(req, res) {
    try {
        // const keys = Object.keys(req.body)

        // for (let key of keys) {
        //     if (req.body[key] == '' && key != "removed_files") {
        //         return res.send('Please, fill all the fields!')
        //     }
        // }

        

        const filePromise = req.files.map(file => Files.create({ ...file }))
        let results = await filePromise[0]
        const fileId = results.rows[0].id

        results = await Chefs.create(req.body, fileId)
        const chefId = results.rows[0].id

        return res.redirect(`/admin/chefs/details/${chefId}`)
    } catch (err) {
        console.log(err)
    }
},
    
async details(req,res){ 

        let results = await Chefs.allfind(req.params.id)
        const chefs = results.rows[0]

        if(!chefs) return res.render("not-found",{
            authorization: "Chef não encontrado!"
        })

        chefresults = await  Chefs.findChefRecipes(req.params.id)
        const if_recipes =chefresults[0].id
        let recipes = ""

        if (if_recipes != null) {
            async function getImage(recipeId) {
                let results = await Recipes.files(recipeId)
                return results[0].path
            }

            const recipePromise = chefresults.map(async recipe => {
                recipe.image = await getImage(recipe.id)
                recipe.image = `${req.protocol}://${req.headers.host}${recipe.image.replace("public", "")}`

                return recipe
            })

            recipes = await Promise.all(recipePromise)
        }

       //pegando imagem do chef 
        let chefFile = await Chefs.getChefAvatar(req.params.id)
        chefFile.path = `${req.protocol}://${req.headers.host}${chefFile.path.replace("public", "")}`

            return res.render("admin/chefs/details",{recipes,chefs,chefFile})    
    },

async edit(req, res) {
    try {
        let results = await Chefs.find(req.params.id)
        const chef = results

        let avatar = await Chefs.files(chef.file_id)
        avatar = avatar.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        }))

        return res.render('admin/chefs/edit', { chef, avatar })
    } catch (err) {
        console.log(err)
    }
},

async put(req, res) {
    try {
        let { name } = req.body;

    if (req.files.length != 0) {
      const file = req.files[0];
      let fileId = await Files.create({ name: file.filename, path: file.path });

      await Chefs.update(req.body.id, {
        name,
        file_id: fileId,
      });
    } else {
      if (req.body.removed_files != "" && req.files[0] == undefined)
        return res.render("admin/chefs/edit", {
          type: "Ao menos uma imagem deve ser enviada!",
        });
    }

    if (req.body.removed_files) {
      DeleteService.removedFiles(req.body);
    }

    await Chefs.update(req.body.id, {
      name,
    });

        return res.redirect(`/admin/chefs`)
    } catch (err) {
        console.log(err)
    }
},

async delete(req, res) {
    try {
        await Chefs.delete(req.body.id)

        return res.redirect(`/admin/chefs`)
    } catch (err) {
        console.log(err)
    }
}
}


        
