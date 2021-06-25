var Recipes =require("../models/recipesModel")
var RecipeFiles =require("../models/recipeFiles")
var Files =require("../models/file")

function checkAllFields(body){
    const keys =Object.keys(body)

        for(key of keys){
            if(body[key] == ""  && key != "removed_files"){
                return {
                    user: body,
                    error:'Preencha todos os campos'
                }
            }
        }
}

async function post(req,res,next){
    try{
    const fillAllFields =  checkAllFields(req.body)
    if(fillAllFields){
        return res.render("admin/recipes/create",fillAllFields)
    }

    if(req.files.length == 0)
    return res.render("admin/recipes/create",{
       error: "Envie todas uma imagem"
    })

    next()

    }catch(err){
        console.error(err)
    }
    
}

async function details(req,res,next){
    try{

        const { id} = req.params

        let recipe = await Recipes.findOne({where:{id}})
        
        if(!recipe) return res.render("not-found",{
            authorization: "Receita não encontrada!"
        })

        req.recipe = recipe

    next()

    }catch(err){
        console.error(err)
    }
    
}

async function update(req,res,next){
    try{
        let results = await Recipes.chefSelectOptions(req.body)
        const options = results.rows
        const fillAllFields =  checkAllFields(req.body)

        if(fillAllFields){
            return res.render("admin/recipes/edit",{
                recipes:req.body,
                error: "Preencha todos os campos",
                chefOptions:options
            })
        }

        const {id} = req.body
        const recipe = await Recipes.findOne({where:{id}})

        req.recipe = recipe 

    next()

    }catch(err){
        console.error(err)
    }
    
}

module.exports ={
    post,
    details,
    update
}