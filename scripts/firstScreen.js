
export class CardsCreateHtml {
    constructor(app, title, description, img, id) {
        this.title = title;
        this.description = description;
        this.img = img;
        this.app = app;
        this.id = id;
        const cardWrap = document.createElement("div"),
            card = document.createElement("div"),
            cardTitle = document.createElement("h2"),
            cardDescription = document.createElement("span"),
            cardImg = document.createElement("img"),
            cardInfo = document.createElement("div");

        cardTitle.textContent = this.title
        cardDescription.textContent = this.description
        cardImg.src = this.img

        cardWrap.classList.add("card-wrap")
        card.classList.add("card")
        cardDescription.classList.add("card-description")
        cardImg.classList.add("card-img")
        cardInfo.classList.add("card-info")

        card.setAttribute("data", `${this.id}`)
        cardImg.addEventListener("click", () => {
        })
        this.cardMove(card)

        cardInfo.append(cardTitle)
        cardInfo.append(cardDescription)
        card.append(cardInfo)
        card.append(cardImg)
        cardWrap.append(card)
        this.app.append(cardWrap)

    }
    cardMove(d) {
        d.getAttribute('data') % 2 === 0 ? d.classList.add("card_move-right") : d.classList.add('card_move');;
        d.classList.add('card_move');
    }

}

