const express = require("express")
const nunjucks = require("nunjucks")
const receitas = require("./data")
const methodOverride = require("method-override")
const routes = require("./routes")

const server = express()
server.use(express.urlencoded({extended:true}))
server.use(express.static("public"))
server.use(methodOverride("_method"))
server.use(routes)

server.get("/", function (req, res) {
    return res.render("index", { items: receitas })
})

server.get("/sobre", function (req, res) {
    return res.render("sobre")
})

server.get("/receitas", function (req, res) {
     return res.render("receitas", { items: receitas })
})

server.get("/receita/:id", function (req, res) {
    const receitaIndex = req.params.id
    console.log(receitas[receitaIndex])
    return res.render("receita", { item: receitas[receitaIndex] }
    )
})

server.use(function (req, res) {
    res.status(404).render("not-found");
});

server.set("view engine", "njk")

nunjucks.configure("Views", {
    express: server,
    autoescape: false,
    noCache: true
})
server.listen(5000, function () {
    console.log("Server is running")
})