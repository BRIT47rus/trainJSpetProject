import { dataScrollBar } from './data.js';

export function interactiveScrollBar() {
    const itemImg = document.querySelectorAll('.scrollbar__item-wrapp')

    itemImg.forEach(((item, idx) => {
        item.setAttribute(`${'data-item'}`, idx)
        item.addEventListener('mouseover', ((e) => {
            const targetImg = e.target.parentNode

            targetImg.classList.add('active-img')

            itemImg.forEach(notFocus => {

                if (!notFocus.classList.contains('active-img')) {
                    notFocus.classList.add('notactive-img')

                } else {
                    notFocus.classList.remove('notactive-img')

                }

            })

        }))
        item.addEventListener('mouseout', (() => {

            itemImg.forEach(notFocus => {
                item.classList.remove('active-img')
                notFocus.classList.remove('notactive-img')

            })

        }))

    }))

}


function createHtmlScrollBar(arr) {

    let html = `
 <div class="scrollbar ">
            <div class="stroke-line" id="stroke-line"></div>
            <div class="scrollbar__wrapp ">
               <div class="scrollbar__item-wrapp  show-scrollbar ">
                   <img src="${arr[0]}" alt="" class="scrollbar__img "></div>
               <div class="scrollbar__item-wrapp show-scrollbar">
                   <img src="${arr[1]}" alt="" class="scrollbar__img"></div>
               <div class="scrollbar__item-wrapp show-scrollbar">
                   <img src="${arr[2]}" alt="" class="scrollbar__img"></div>
               <div class="scrollbar__item-wrapp show-scrollbar">
                   <img src=".${arr[3]}" alt="" class="scrollbar__img"></div>
               <div class="scrollbar__item-wrapp show-scrollbar">
                   <img src=".${arr[4]}" alt="" class="scrollbar__img"></div>
           </div>
           <div class="scroll__button">

               <div class="prev-btn" id="prev-btn" >prev</div>
               <div class="next-btn" id="next-btn" >next</div> 
           </div>
           </div>

`

    return html
}



export function renderScrollBar(app, arr) {
    const html = createHtmlScrollBar(arr)

    app.innerHTML  = html;

}

