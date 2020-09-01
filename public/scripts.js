const click = document.querySelectorAll("span")
const lista = document.querySelectorAll(".lista")


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

document.querySelector(".newIngre").addEventListener("click",function(){
    const newFieldContainer = document.querySelector(".ingredient").cloneNode(true)
    const fileds = newFieldContainer.querySelectorAll("input")
    fileds.forEach(function(field){
        field.value =""

    const newIngredient=document.querySelector(".ingredient img")
    newIngredient.classList.add("visible")
    })
   const childField= document.querySelector("#ingredients").appendChild(newFieldContainer)
  
})






