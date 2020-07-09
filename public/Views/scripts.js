const  cards = document.querySelectorAll(".card")
const modalOverlay  = document.querySelector(".modal-overlay")
const modal =document.querySelector(".modal")

for(let card of cards){
    card.addEventListener("click", function(){
        modalOverlay.classList.add("active")


       const imgId = card.getAttribute("id")
       modalOverlay.querySelector("img").src =`/public/assets/${imgId}.png`

       const title =card.querySelector("p").textContent
       modalOverlay.querySelector("p").innerHTML =title

       const criador =card.querySelector(".criador").textContent
       modalOverlay.querySelector(".criador").innerHTML =criador

    })
}

document.querySelector(".close-modal").addEventListener("click", function(){
    modalOverlay.classList.remove("active")
    modalOverlay.querySelector("img").src = ""
})