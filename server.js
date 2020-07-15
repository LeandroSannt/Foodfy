const express = require("express")
const nunjucks = require("nunjucks")

const server = express()

server.use(express.static("public"))

server.set("view engine" , "njk")

nunjucks.configure("Views",{
    express:server,
    autoescape:false,
    noCache:true
})

/*=====ROUTES=====*/
server.get("/", function(req,res){
    return res.render("index")
})

server.get("/sobre",function(req,res){
    return res.render("sobre")
})

server.get("/receitas",function(req,res){
    return res.render("receitas")
})




/*==================*/


server.listen(5000,function(){
    console.log("Server is running")
})