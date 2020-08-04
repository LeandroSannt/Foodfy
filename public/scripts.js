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


console.log("oi")