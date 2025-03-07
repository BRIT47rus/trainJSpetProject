import { productsData } from "./data.js";

class Product {


    constructor(app, product) {
        this.app = app;
        this.product = product;
        const wrapProduct = document.createElement('div'),

            gridWrapper = document.createElement('div');
        gridWrapper.classList.add('goods-wrappes');
        wrapProduct.classList.add('goods');
        wrapProduct.setAttribute('id', 'goods');

        const html = this.renderHtml(product, wrapProduct);
        gridWrapper.innerHTML = html;
        wrapProduct.append(gridWrapper);
        this.app.append(wrapProduct);
    }
    renderHtml(product, app = this.app) {
        let htmlArray = '';


        product.forEach((item) => {
            const rating = this.counter(item)

            let html = `
            
                <div class="goods_wrap">
                    <div class="goods__item-wrap">
                        <div class="goods__item">
                            <span>${item.productName}</span>
                            <div class="goods__img">
                                <img src="${item.imageProduct}" alt="">
                            </div>
                            <div class="goods__param">
                                <span>${item.descriptionProduct}</span>
                                <div class="goods__coast">
                                    <span>${item.priceProduct}</span>
                                    <span>$</span>
                                </div>
                                <div class="goods__rating">
                                    <div id="rating">${rating}</div>
                                    <div id="star"> ${this.ratingStars(rating)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

    `  ;

            htmlArray += html
        })


        return htmlArray

    }
    ratingStars(counter) {
        let stars = ["★"];
        stars.length = counter
        return stars.join("★");

    }
    counter(arr) {
        const item = arr.vote

        const count = Math.round((5 * item.five
            + 4 * item.four + 3 * item.three + 2 * item.two + item.one)
            / (item.five + item.four + item.three + item.two + item.one));
        return count
    }
    clearApp() {
        this.app.innerHTML = ' ';

    }


}

//функция создания блока поиска--------------
function searchBlock(app, data) {
    const regexName = /\w+/i;
    const regexPrice = /\d+/;
    //создаем инпут
    const inputProduct = document.createElement('input'),
        moneyInp = document.createElement('span'),
        nameInp = document.createElement('span'),
        sortPrice = document.createElement('img'),
        searchWrap = document.createElement('div');
    inputProduct.setAttribute('type', 'text');

    sortPrice.setAttribute('src', '../assets/image/arrow-down.png')

    nameInp.classList.add('name-inp', 'active-type');
    sortPrice.classList.add('sort-price');
    sortPrice.setAttribute('id', 'sort-price');
    moneyInp.classList.add('money-inp');
    searchWrap.classList.add('search-wrap');
    inputProduct.setAttribute('id', 'goods__input');

    moneyInp.textContent = '$';
    nameInp.textContent = 'Имя';

    inputProduct.placeholder = 'Поиск';
    let item = ''

    moneyInp.addEventListener('click', function () {
        inputProduct.value = '';
        nameInp.classList.remove('active-type');
        moneyInp.classList.add('active-type');

        inputProduct.setAttribute('type', 'number');


    })
    nameInp.addEventListener('click', function () {
        inputProduct.value = '';
        moneyInp.classList.remove('active-type');
        nameInp.classList.add('active-type');

        inputProduct.setAttribute('type', 'text');


    })


    searchWrap.append(sortPrice)
    searchWrap.append(nameInp)
    searchWrap.append(moneyInp)
    searchWrap.appendChild(inputProduct);
    app.insertAdjacentElement('afterbegin', searchWrap)

}

// Сортировка товара---------------------

function sortPriceProduct(data, app) {
    const btnSort = document.getElementById('sort-price');

    btnSort.addEventListener('click', (e) => {

        const { target } = e;
        target.classList.toggle('changeSort');
        productsData.sort((a, b) => a.priceProduct - b.priceProduct);

        if (target.classList.contains('changeSort')) {
            productsData.sort((a, b) => b.priceProduct - a.priceProduct);

        }
        clearTabs()
        clearHtml()

        renderProducts(app, data)
        console.log(data);

    })

}

//фильтрация товара---------------------
function fillter(data, app) {

    const input = document.getElementById('goods__input');

    input.addEventListener('input', function (e) {
        const valueInp = e.target.value.trim();
        let nData;
        nData = data.filter((d) => d.productName.toLowerCase().includes(valueInp.toLowerCase()))


        clearTabs()
        clearHtml()

        renderProducts(app, nData)

    })
}

//Очистка ХТМЛ----------------------------

function clearHtml() {
    const html = document.querySelectorAll('.goods');

    html.forEach((item) => {
        item.remove()
    }
    )//удаляем ненужные товары
}
export function clearTabs() {
    const blancs = document.querySelectorAll('.goods-blank');
    const wrapBlanck = document.querySelector('.blank-wrap')
    blancs.forEach((item) => {
        item.remove()
    }

    )//удаляем пустые пины
  wrapBlanck.remove();
    wrapBlanck.innerHTML = ' '
    // blancs.innerHTML = ''
}
//----------------------------------------------------------------

//Рисуем Продукты--------------------------------
function renderProducts(app, data, num = 9) {

    const wrapBlank = document.createElement('div');
    wrapBlank.className = 'blank-wrap';
    let dataNewBlack = []

    if (data.length >= num) {

        for (let i = 0, j = 0; i <= data.length; i = i + num, j++) {
            //создаем пины
            const nextBlack = document.createElement('div');
            nextBlack.setAttribute('data-product', `${j}`);
            nextBlack.classList.add('goods-blank');
            nextBlack.textContent = `${i + 1} - ${i + num}`;
            //добавляем распинованые массивы
            dataNewBlack.push(data.slice(i, i + num))
            if (dataNewBlack[j].length != 0) {
                dataNewBlack.filter(item => !Array.isArray(item) || item.length > 0);
                wrapBlank.append(nextBlack)
            }
        }
        app.insertAdjacentElement('afterend', wrapBlank)

        //----------------------------------------------------------------
        new Product(app, dataNewBlack[0])
        //отрисовываем клики по пину
        const blancs = document.querySelectorAll('.goods-blank');
        blancs.forEach((elem, idx) => {

            if (idx === 0) {
                elem.classList.add('active-black')
            }
            elem.addEventListener('click', (e) => {
                const atr = elem.dataset.product;
                const { target } = e;

                target.classList.add('active-black')

                blancs.forEach((blanc) => {
                    // удаляем активный класс у всех бланков и у текущего
                    blanc.classList.remove('active-black')
                    target.classList.add('active-black')
                })
                clearHtml()//удаляем ненужные товары
                let product = new Product(app, dataNewBlack[atr])
            })
        })

    } else if (data.length < num) {
        for (let elem of data) {
            dataNewBlack.push(elem)
        }
        new Product(app, dataNewBlack)
    }

}

function renderCardsProduct(app, data) {
    searchBlock(app, data)
    fillter(data, app)
    sortPriceProduct(data, app)
    renderProducts(app, data)
}
export { renderCardsProduct }