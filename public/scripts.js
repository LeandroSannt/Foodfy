const click = document.querySelectorAll("span")
const lista = document.querySelectorAll(".lista")
console.log(click)

for (let i = 0; i < click.length; i++) {
    click[i].addEventListener("click", function () {
        if (click[i].textContent == 'ESCONDER') {
            click[i].innerHTML = 'MOSTRAR'
            lista[i].classList.toggle('active')
        } else {
            click[i].innerHTML = 'ESCONDER'
            lista[i].classList.remove('active')
        }
    })
}
    const newIngre = document.querySelector(".newIngre")
    console.log(newIngre)

   // for(let a = 0; a<newIngre.length; a++){
        newIngre.addEventListener("click",function(){
        const newFieldContainer = document.querySelector(".ingredient").cloneNode(true)
        const fileds = newFieldContainer.querySelectorAll("input")
        fileds.forEach(function(field){
            field.value =""

    })
document.querySelector("#ingredients").appendChild(newFieldContainer)
})


const newPrep = document.querySelector(".newPrep")
console.log(newIngre)

// for(let a = 0; a<newIngre.length; a++){
    newPrep.addEventListener("click",function(){
    const newFieldContainer = document.querySelector(".preparation").cloneNode(true)
    const fields = newFieldContainer.querySelectorAll("input")
    fields.forEach(function(field){
        field.value =""

})
document.querySelector("#preparation").appendChild(newFieldContainer)
})
/*
    document.querySelector(".ingredient img").addEventListener("click",function(){
    const removeIngre =document.querySelector("#addIngre")
    removeIngre.removeChild(removeIngre.childNodes[1])
   
})*/















