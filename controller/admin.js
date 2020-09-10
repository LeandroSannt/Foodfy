const fs = require("fs")
const data =require("../data.json")

exports.listing = function (req,res){

    return res.render("admin/listing",{recipes:data.recipes})
}

exports.create = function (req,res){
    return res.render("admin/create")
}

exports.details = function (req,res){
    return res.render("admin/details")
}

exports.edit = function (req,res){
    return res.render("admin/edit")
}

exports.post =function(req,res){

    const keys = Object.keys(req.body)
        for (key of keys) {
            if (req.body[key] == "") 
                return res.send("Dados Faltando")
            }
            
           let{ image,title,author,ingredients,preparation,information}= req.body
           const id =Number(data.recipes.length +1)
  
                data.recipes.push({
                    id,
                    image,
                    title,
                    author,
                    ingredients,
                    preparation,
                    information
                })

        fs.writeFile("data.json", JSON.stringify(data,null,2),function(err){
            if(err) return res.send("Algum erro")
            return res.redirect("/admin/listing")
        })
}

exports.put =function(req,res){
    return res.render()
}

exports.delete =function(req,res){
    return res.render()
}