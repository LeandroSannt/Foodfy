var Chefs =require("../models/chefsModel")


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

async function index(req,res,next){
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

async function post(req,res,next){
    try{
    const fillAllFields =  checkAllFields(req.body)
    if(fillAllFields){
        return res.render("admin/chefs/create",fillAllFields)
    }

    if (req.files.length == 0)
            return res.render('admin/chefs/create',{
                error:"Porfavor, preencha pelo menos uma foto",
                chef:req.body
            })

    next()

    }catch(err){
        console.error(err)
    }
    
}

module.exports ={
    index,
    post,
    
}