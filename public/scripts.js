const click = document.querySelector(".revelacao")
const lista1 = document.querySelector(".lista1")
click.addEventListener("click", function(){
   lista1.classList.toggle("active")
   click.innerHTML="Mostrar"
})

const click2=document.querySelector(".revelacao2")
const lista2 = document.querySelector(".lista2")
click2.addEventListener("click", function(){
    lista2.classList.toggle("active")
    click2.innerText="Mostrar"
    
 })

const click3=document.querySelector(".revelacao3")
const detalhes = document.querySelector(".detalhes")
 click3.addEventListener("click", function(){
    detalhes.classList.toggle("active")
    click3.innerHTML="Mostrar"
 }) 


   


