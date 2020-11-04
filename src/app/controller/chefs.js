var {age, date} =require("../lib/configs/utils")
var Chefs =require("../models/chefsModel")

module.exports={
    
index(req,res){
        Chefs.all(function(chefs){
            return res.render("admin/chefs/index",{chefs})
        })
    },

create(req,res){
        return res.render("admin/chefs/create")
    },
    
post(req,res){
            const keys = Object.keys(req.body)
            for (key of keys) {
                if (req.body[key] == "") 
                    return res.send("Dados Faltando")
                }
                Chefs.create(req.body,function(chefs){
                    return res.redirect(`/admin/chefs/details/${chefs.id}`)
                })
    },
    
details(req,res){ 
    Chefs.find(req.params.id,function(chefs){
        if(!chefs) return res.send("chef não encontrado")
            Chefs.findRecipes(chefs.id,function(recipes){
                chefs.created_at = date(chefs.created_at).format
                return res.render("admin/chefs/details",{chefs,recipes})    
            })
        })
    },

    edit(req,res){
        Chefs.find(req.params.id,function(chefs){
            if(!chefs) return res.send("chef não encontrado")
                return res.render("admin/chefs/edit",{chefs})    
       })
    },

  
put(req,res){
    const keys = Object.keys(req.body)
    for (key of keys) {
        if (req.body[key] == "") 
            return res.send("Dados Faltando")
        }

        Chefs.update(req.body,function(){
            return res.redirect(`/admin/chefs`)  

        })
    },
    
delete(req,res){
        Chefs.delete(req.body.id,function(){
            return res.redirect ("/admin/chefs")
        })
    }
}


        
