var Recipes =require("../models/recipesModel")
var RecipeFiles =require("../models/recipeFiles")
var Files =require("../models/file")

module.exports={
    
async index(req,res){
    
    let results = await Recipes.recipesusers(req.session.userId)
    const recipes = results.rows

    if (!recipes) return res.send("receitas não encontradas")

    async function getImage(RecipeId){
            let results = await Recipes.allfiles(RecipeId)
            const files = results.rows.map(file => `${req.protocol}://${req.headers.host}${file.path.replace("public","")}`)
            return files[0]
        }
            
        const recipesPromise = recipes.map(async recipe=>{
            recipe.img = await getImage(recipe.id)

            return recipe
        })
        
        const lastAdded = await Promise.all(recipesPromise)    
        
        return res.render("admin/recipes/index",{recipes:lastAdded})
    },
        
async create(req,res){
    let results = await Recipes.chefSelectOptions(req.body)
    const options = results.rows
        return res.render("admin/recipes/create",{chefOptions:options})
    },
    
async post(req,res){
             
    //criando receita    
    let results = await Recipes.create(req.body)
    const recipeId = results.rows[0].id

    //vincular foto a receita
    let filesPromise = req.files.map(file => Files.create(file))
    results = await Promise.all(filesPromise)

    const recipeFilesPromise = results.map(file => RecipeFiles.create({    
        recipe_id:recipeId,
        file_id:file.rows[0].id
    }));
    results = await Promise.all(recipeFilesPromise)
        return res.redirect(`/admin/recipes/details/${recipeId}`)
    },

async details(req,res){ 
    try{
        let {recipe} = req
        let files = (await Files.findRecipeFiles(recipe.id)).rows

        files = files.map((file) => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        }))
        
        recipe={
            ...recipe,
            files
        }
        return res.render('admin/recipes/details', {recipe,images:recipe.files})

    }catch(error){
        throw new Error(error)
    }   

    },
    
async edit(req,res){
    try{
        let results = await Recipes.find(req.params.id)
        let recipes = results.rows[0]

        if(!recipes) return res.render("not-found",{
            authorization: "Receita não encontrada!"
        })

        let files = (await Recipes.allfiles(recipes.id)).rows

        files = files.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public","")}`
        }))

        recipes = {
            ...recipes,
            images: files
        }

        results = await Recipes.chefSelectOptions(req.body) 
        const chefOptions = results.rows
        return res.render("admin/recipes/edit", {recipes, chefOptions,files})
    }catch(error){
        throw new Error(error)
    }
},
    
async put(req,res){
    try{

        if(req.files.length != 0){
            const newFilesPromise = req.files.map(file => Files.create({...file}))
            const filesId = await Promise.all(newFilesPromise)

            const recipeFilesPromise = filesId.map((fileId) => {
                Files.createRecipeFiles({
                    recipe_id: req.body.id,
                    file_id: fileId.rows[0].id
                })
            })
            await Promise.all(recipeFilesPromise)
        }

        if(req.body.removed_files){
            const removedFiles = req.body.removed_files.split(',')
            const lastIndex = removedFiles.length - 1
            removedFiles.splice(lastIndex, 1)

            const removedRecipeFiles = removedFiles.map(id => Files.delete(id))
            await Promise.all(removedRecipeFiles)
        }

        await Recipes.update(req.body)

        return res.redirect(`/admin/recipes`) 
    }catch(error){
        throw new Error(error)
    }
    
},      
        
async delete(req, res){
    try{
        const { id } = req.body

        await Recipes.delete(id)

        return res.redirect("/admin/recipes")
    }catch(error){
        throw new Error(error)
    }
    
}
}

