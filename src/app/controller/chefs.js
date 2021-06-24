var Chefs =require("../models/chefsModel")
var Recipes =require("../models/recipesModel")

var RecipeFiles =require("../models/recipeFiles")
var Files =require("../models/file")
const { files } = require("../models/chefsModel")

module.exports={
    
async index(req,res){
        results =await Chefs.all(req.body)
        const chefs = results.rows

        if (!chefs) return res.send("receitas não encontradas")

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
        
            return res.render("admin/chefs/index",{chefs,chefImage})    
    },

create(req,res){
        return res.render("admin/chefs/create")
    },
    
async post(req, res) {
    try {
        console.log(req.body)
        // const keys = Object.keys(req.body)

        // for (let key of keys) {
        //     if (req.body[key] == '' && key != "removed_files") {
        //         return res.send('Please, fill all the fields!')
        //     }
        // }

        if (req.files.length == 0)
            return res.send('Por favor, envie pelo menos uma foto')

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

        if(!chefs) return res.send("chef não encontrado")

        // const chefRecipes = await Chefs.findChefRecipes(req.params.id)
        // const recipeExist = chefRecipes[0].id
        // let recipes = ''


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
        // const keys = Object.keys(req.body)

        // for (let key of keys) {
        //     if (req.body[key] == '' && key != "removed_files") {
        //         return res.send('Please fill all the fields')
        //     }
        // }

       // await Chefs.update(req.body)

       // console.log(req.body)

       
    //    let results = await Recipes.recipeFiles(req.body.id)
    //    console.log(results)
    //     let fileId = results[0].id

         console.log(req.removed_files)



        // if (req.files.length != 0) {
        //     const filePromise = req.files.map(file => Files.create(file))

        //     const results = await filePromise[0]
        //     fileId = results.rows[0].id
        // }

        // if (req.removed_files) {
        //     const removedFiles = req.body.removed_files.split(',')
        //     const lastIndex = removedFiles.length - 1
        //     removedFiles.splice(lastIndex, 1)

        //     await removedFiles.map(id => Files.chefFileDelete(id))
        // }

        

        await Chefs.update(req.body)

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


        
