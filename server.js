const express = require("express")
const nunjucks = require("nunjucks")
const methodOverride = require("method-override")
const routes = require("./controller/routes")

const server = express()
server.use(express.urlencoded({extended:true}))
server.use(express.static("public"))
server.use(methodOverride("_method"))
server.use(routes)

server.use(function (req, res) {
    res.status(404).render("not-found");
});

server.set("view engine", "njk")

nunjucks.configure("Views", {
    express: server,
    autoescape: false,
    noCache: true
})
server.listen(4000, function () {
    console.log("Server is running")
})