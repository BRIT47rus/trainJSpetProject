import { dataFirstScreen, productsData, dataScrollBar } from "./data.js"
import { renderCardsProduct, clearTabs } from "./Products.js";
import { rebderField } from "./scroll.js";
import { renderScrollBar, interactiveScrollBar } from "./scrollbar.js"
import { CardsCreateHtml } from "./firstScreen.js"


const app = document.getElementById("app");

function renderPages(app) {
    //класс родитель по созданию хтмл

    function renderScreen(app, obj) {
        obj.forEach(element => {
            new CardsCreateHtml(app, element.title, element.descripton, element.image, element.id);
        });

        //Навбар-----------
        const cards = document.querySelectorAll('.card-wrap');
        const navItem = nav.querySelectorAll('.nav__item-wrap');
        //очистка навбара
        function clearItems(parent) {
            parent.forEach((item) => {
                item.classList.remove('nav__item_actice')
            })
        }


        navItem.forEach((item, idx) => {
            item.onclick = function () {

                if (idx === 0) {
                    app.innerHTML = ''
                    //Товары -------------

                    renderCardsProduct(app, productsData)
                }
                if (idx === 1) {

                    app.innerHTML = ''
                    clearTabs()
                    renderingHTMLScrollBar()

                }
                if (idx === 2) {
                    app.innerHTML = ''

                    renderFieldFootball()

                }
                clearItems(navItem)
                addActiveItem(navItem, idx)

            }

        })
        //Добавление класса в набраб( актиный)
        function addActiveItem(parent, idx) {
            parent[idx].classList.add('nav__item_actice')
        }
        ///---Главный экран---------------
        cards.forEach((card, idx) => {

            card.addEventListener("click", function (e) {
                const nav = document.querySelector('.nav');
                nav.style.display = 'flex'

                if (idx === 0) {
                    app.innerHTML = ' '
                    //Товары -------------

                    renderCardsProduct(app, productsData)
                }
                if (idx === 1) {

                    app.innerHTML = ' '

                    renderingHTMLScrollBar()

                }
                if (idx === 2) {
                    app.innerHTML = ' '

                    renderFieldFootball()

                }
                addActiveItem(navItem, idx)


            }
            )
        })

    }

    renderScreen(app, dataFirstScreen)
}
renderPages(app)

//Футбольное поле, тестируем наследование и коструктор обсерв
function renderFieldFootball() {
    app.innerHTML = rebderField(app);
    const cards = document.querySelectorAll('.player')


    function test(cards) {
        cards.forEach(card => {

            const observer = new IntersectionObserver(card => {
                card.forEach(entry => {
                    if (entry.isIntersecting) {

                        entry.target.classList.add('show-player');
                        observer.unobserve(entry.target);

                    } else {

                        entry.target.classList.remove('show-player');
                    }

                })
            },
                { threshold: 0.9 })

            observer.observe(card)
        })
    }
    test(cards)


}

//СкроллБар рисуем----------------------
function renderingHTMLScrollBar(idx = 0) {
    let idxN = idx
    renderScrollBar(app, dataScrollBar[idxN])
    interactiveScrollBar()

    const btnNext = document.getElementById('next-btn')
    const prevBtn = document.getElementById('prev-btn')
    const scrollbaWrapp = document.querySelectorAll('.scrollbar__item-wrapp')

    //Кнопки переключения фото 
    btnNext.onclick = function () {
        //     scrollbaWrapp.forEach((el) =>{
        //      el.classList.add('show-scrollbar')
        //      console.log(el);
        // })




        idxN += 1
        if (idxN == 3) {
            idxN = 0
        }

        app.innerHTML = ' '
        renderingHTMLScrollBar(idxN)
    }

    prevBtn.onclick = function () {
        idxN -= 1
        if (idxN < 0) {
            idxN = 2
        }
        app.innerHTML = ' '
        renderingHTMLScrollBar(idxN)
    }

}



















