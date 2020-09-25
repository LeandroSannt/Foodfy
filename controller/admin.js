const fs = require("fs")
const { filter } = require("../data")
const data =require("./data.json")

exports.listing = function (req,res){
    return res.render("admin/listing",{recipes:data.recipes})
}

exports.create = function (req,res){
    return res.render("admin/create")
}

exports.details = function (req,res){ 
    const {id }= req.params

    const foundRecipes =data.recipes.find(function(recipes){
        return id == recipes.id
    })

    if(!foundRecipes) return res.send("Recipes not found")

    return res.render("admin/details",{foundRecipes})
}

exports.edit = function (req,res){

    const { id } = req.params
    
    const foundRecipes = data.recipes.find(function (recipes) {
        return id == recipes.id
    })
    if (!foundRecipes) return res.send("Recipes.not found")

    const recipes ={
        ...foundRecipes
    }

    return res.render("admin/edit",{recipes})
}


exports.post =function(req,res){
    const keys = Object.keys(req.body)
    for (key of keys) {
        if (req.body[key] == "") 
            return res.send("Dados Faltando")
        }

       const id = Number(data.recipes.length +1)

       data.recipes.push({
           id,
          ... req.body
       })

        fs.writeFile("controller/data.json",JSON.stringify(data,null,2),function(err){
            if (err) return res.send("Erro ao salvar arquivo")
            return res.redirect("/admin/listing")
        })
}

exports.put =function(req,res){

    const{id}= req.body
    let index = 0

    const foundRecipes = data.recipes.find(function (recipes, foundIndex) {
        if (recipes.id == id){
        index = foundIndex
        return true
    }
    })
    if (!foundRecipes) return res.send("students not found")

    const recipes ={
        ...foundRecipes,
        ...req.body,
        id:Number(req.body.id)
     
    }

    data.recipes[index] = recipes

    fs.writeFile("data.json", JSON.stringify(data,null,2),function(err){
        if(err) return res.send("Write error")
    })
    return res.redirect(`/admin/details/${id}`)  
}

exports.delete =function(req,res){
    const {id} = req.body
    const filteredTeachers = data.recipes.filter(function(teacher){
        return id != teacher.id
    })
    data.recipes= filteredTeachers

    fs.writeFile("data.json", JSON.stringify(data,null,2), function(err){
        if (err) return res.send("Erro")

        return res.redirect ("/admin/listing")
    })
}
        
