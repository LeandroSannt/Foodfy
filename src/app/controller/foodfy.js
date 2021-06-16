var {age, date} =require("../lib/configs/utils")
var Chefs =require("../models/chefsModel")
var Recipes =require("../models/recipesModel")
var Files =require("../models/file")

module.exports ={

async index(req,res){
    let results = await Recipes.all()
    const recipes = results.rows

    if (!recipes) return res.send("produtos não encontrado")

    async function getImage(RecipeId){
            let results = await Recipes.files(RecipeId)
            const files = results.rows.map(file => `${req.protocol}://${req.headers.host}${file.path.replace("public","")}`)
            return files[0]
        }
        
        const recipesPromise = recipes.map(async recipe=>{
            recipe.img = await getImage(recipe.id)

            return recipe
        }).filter((recipe,index)  => index > 5 ? false : true)
        
        
        results = await Chefs.findRecipes(req.params.id)
        const chefs =results.rows[0]
        
        const lastAdded = await Promise.all(recipesPromise)    
            return res.render("foodfy/index",{chefs,recipes:lastAdded})
    },
    
sobre(req, res) {
        return res.render("foodfy/sobre")
    },
    
async receitas(req, res) {
    try {
        let { filter, page, limit } = req.query

        page = page || 1
        limit = limit || 6
        let offset = limit * (page - 1)

        const params = { filter, page, limit, offset }

        let recipes = await Recipes.paginate(params)

        const pagination = {
            total: Math.ceil(recipes[0].total / limit),
            page
        }

        if (!recipes) return res.send("Recipe not found")

        async function getImage(recipeId) {
            let results = await Recipes.recipeFiles(recipeId)
            results = results.map(recipe => `${req.protocol}://${req.headers.host}${recipe.path.replace('public', '')}`)

            return results[0]
        }

        const recipesPromise = recipes.map(async recipe => {
            recipe.image = await getImage(recipe.id)

            return recipe
        })

        const eachRecipeFixed = await Promise.all(recipesPromise)

        return res.render('foodfy/receitas', { recipes: eachRecipeFixed, filter, pagination })
    } catch (err) {
        console.log(err)
    }
},

async chefs(req,res){
    results =await Chefs.all(req.body)
    const chefs = results.rows
        return res.render("foodfy/chefs",{chefs})

    },
    
async abrirReceita(req, res) {
    let results = await Recipes.find(req.params.id)
    let recipes = results.rows[0]
    const chef = results

    let files = (await Files.findRecipeFiles(recipes.id)).rows

    files = files.map((file) => ({
        ...file,
        src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
    }))
    if(!recipes) return res.send('Recipe not found')

    recipes = {
        ...recipes,
        files
    }
        return res.render(`foodfy/receita`,{recipes, images:recipes.files})

    },

async searchRecipes(req,res){
   const {filter} = req.query

   if(filter){
    let results = await Recipes.findBy(filter)
    const recipes = results.rows


    async function getImage(RecipeId){
        let results = await Recipes.files(RecipeId)
        const files = results.rows.map(file => `${req.protocol}://${req.headers.host}${file.path.replace("public","")}`)
        return files[0]
    }
    
    const recipesPromise = recipes.map(async recipe=>{
        recipe.img = await getImage(recipe.id)

        return recipe
    })

    const lastAdded = await Promise.all(recipesPromise)  

        return res.render(`foodfy/searchRecipes`,{recipes:lastAdded,filter})

   }else{
    let results = await Recipes.all(req.body)
    const recipes = results.rows

    async function getImage(RecipeId){
        let results = await Recipes.files(RecipeId)
        const files = results.rows.map(file => `${req.protocol}://${req.headers.host}${file.path.replace("public","")}`)
        return files[0]
    }
    
    const recipesPromise = recipes.map(async recipe=>{
        recipe.img = await getImage(recipe.id)

        return recipe
    })

    const lastAdded = await Promise.all(recipesPromise)  

    return res.render(`foodfy/searchRecipes`,{recipes:lastAdded,filter})
}
    }
}