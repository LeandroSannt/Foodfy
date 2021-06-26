
const cards = document.querySelectorAll(".card")
        for (let card of cards) {
        card.addEventListener("click", () => {
        const cardId = card.getAttribute("id")
        window.location.href = `/receita/${cardId}`
    })
}

