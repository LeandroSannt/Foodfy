

exports.listing = function (req,res){
    return res.render("instructors/create")
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