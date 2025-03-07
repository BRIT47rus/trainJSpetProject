import { dataGoalkeaper, dataDefender, dataHalfDefend, dataAttack } from './data.js'
function rebderField(app) {
    const html = `
         <div class="scroll-wrapp">
            <div class="field-square">
                <div class="rama_top ">
                     ${renderClassPlayer(dataGoalkeaper, Goalkeaper)}
                    <div class="rama__square">
                    </div>
                    <div class="rama__dot"></div>
                    <div class="rama__round"></div>
                </div>

                <div class="defend" id='card-scroll'>
                    ${renderClassPlayer(dataDefender, Defender)}
               
                </div>
                <div class="attdef">

                     ${renderClassPlayer(dataHalfDefend, HalfDefer)}
            
                </div>

                <div class="field__center">

                    <div class="center__dot"></div>
                    <div class="center__round"></div>
                </div>
                <div class="attack">
                    ${renderClassPlayer(dataAttack, Atack)}
                </div>
                <div class="rama_bottom">
                    <div class="rama__square"></div>
                    <div class="rama__dot"></div>
                    <div class="rama__round"></div>
                </div>
            </div>
        </div>
 `
    return html
}

//Родитель . создание игроков
class Player {
    constructor(name, description, photo) {
        this.name = name;
        this.description = description;
        this.photo = photo;
    }
    renderPlayer(i) {
        const html = `
         <div class="player ${this.class + (i + 1)} " >
               <img src="${this.photo}" alt="игрок">
              <div class="plsyer__desc showe-descriptionPlayer">${this.name} <br>
                  Достижения: <br>
                  ${this.description}
              </div>
         </div>
        `
        return html
    }

}
//Вратарь-------------------
class Goalkeaper extends Player {
    constructor(name, description, photo) {
        super(name, description, photo)
        this.class = 'goalkeaper'
    }
    renderPlayer(i) {
        const html = `
        <div class="player ${this.class} ">
              <img src="${this.photo}" alt="игрок">
             <div class="plsyer__desc showe-descriptionPlayer">${this.name} <br>
                 Достижения: <br>
                 ${this.description}
             </div>
        </div>
       `
        return html
    }
}
//Защита
class Defender extends Player {
    constructor(name, description, photo) {
        super(name, description, photo)
        this.class = 'defender_'
    }
}
//Полозащита
class HalfDefer extends Player {
    constructor(name, description, photo) {
        super(name, description, photo)
        this.class = 'attdefer_'
    }
}

//Атакующий
class Atack extends Player {
    constructor(name, description, photo) {
        super(name, description, photo)
        this.class = 'attacker__'
    }
}
//Функция отрисовки игроков ( для HTML)
function renderClassPlayer(data, Class) {
    let html = '';
    for (let i = 0; i < data.length; i++) {
        html += ` ${new Class(data[i].name
            , data[i].description
            , data[i].image)
            .renderPlayer(i)}`
    }
    return html
}

const observer = new IntersectionObserver(function (player) {
    players.forEach(player => {
        if (player.isIntersecting) {
            player.target.classList.add('show-player')
            observer.unobserve(player.target)
        }
    })
})
export { rebderField, }