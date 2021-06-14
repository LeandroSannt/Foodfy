const currentPage = location.pathname
const menuItems = document.querySelectorAll(" header .menu a")


/*==================SELECT MENU=====================*/
for (item of menuItems){
    if(currentPage.includes(item.getAttribute("href"))){
        item.classList.add("active")
    }
}

/*=================MOSTRAR E ESCODER================*/
    const click = document.querySelectorAll("span")
const lista = document.querySelectorAll(".lista")

for (let i = 0; i < click.length; i++) {
    click[i].addEventListener("click", function () {
        if (click[i].textContent == 'ESCONDER') {
            click[i].innerHTML = 'MOSTRAR'
            lista[i].classList.toggle('active2')
        } else {
            click[i].innerHTML = 'ESCONDER'
            lista[i].classList.remove('active2')
        }
    })
}

/*================CLONE INPUT=========================*/

    const newIngre = document.querySelector(".newIngre")
        newIngre.addEventListener("click",function(){
        const newFieldContainer = document.querySelector(".ingredient").cloneNode(true)
        const fileds = newFieldContainer.querySelectorAll("input")
        fileds.forEach(function(field){
            field.value =""
    })
    document.querySelector("#ingredients").appendChild(newFieldContainer)
})

const newPrep = document.querySelector(".newPrep")
// for(let a = 0; a<newIngre.length; a++){
    newPrep.addEventListener("click",function(){
    const newFieldContainer = document.querySelector(".preparation").cloneNode(true)
    const fields = newFieldContainer.querySelectorAll("input")
    fields.forEach(function(field){
        field.value =""
})
    document.querySelector("#preparation").appendChild(newFieldContainer)
})


function deleteField(event){
    const span = event.currentTarget
    const fieldsContainer = document.querySelector(".ingredient")

    if(fieldsContainer.length<=1){
        span.parentElement[0].value=""
        return
    }
    span.parentNode.remove()
}

function deletePreparation(event){
        const span = event.currentTarget
    const fieldsContainer = document.querySelector(".preparation")

    if(fieldsContainer.length<=1){
        span.parentElement[0].value=""
        return
    }
    span.parentNode.remove()

}


const ImageGallery ={
    highlight:document.querySelector(".gallery .highlight>img"),
    previews:document.querySelectorAll(".gallery-preview img"),
    setImage(e){
        const {target} = e

        ImageGallery.previews.forEach(preview=>preview.classList.remove("active"))
        target.classList.add("active")

        ImageGallery.highlight.src = target.src
        lightbox.image.src =target.src

    },
}

const lightbox={
    target:document.querySelector(".lightbox-target"),
    image:document.querySelector(".lightbox-target img"),
    closeButton:document.querySelector(".lightbox-target a.lightbox-close"),
    open(){
        lightbox.target.style.opacity = 1
        lightbox.target.style.top = 0
        lightbox.target.style.bottom = 0
        lightbox.closeButton.style.top = 0
    

    },
    close(){
        lightbox.target.style.opacity = 0
        lightbox.target.style.top = "-100%"
        lightbox.target.style.bottom = "initial"
        lightbox.closeButton.style.top = "-80px"

    }
}




   













