const tablero = document.getElementById("tablero");
const buttonStart = document.getElementById('start');

let cards = [];
let selected = [];
let pairs = 0;
let tries = 0;
let gamePlus = -1;
let img = [];

const newGame = () => {
    buttonStart.style.display = 'none';
    selected = [];
    cards = [];
    pairs = 0;
    tries = 0;
    gamePlus++;
    img = [];

    for(let i = 0; i < 8; i++){
        const number = getRandom();
        img.push(number);
    }
    
    for (let i = 0; i < 16; i++) {
        cards.push(`
            <div class="card-container" onclick="select(${i})">
                <div class="cards" id="cards-${i}">
                    <div class="front back" id="back-${i}">
                        ${icons[img[gamePlus]]}
                    </div>
                    <div class="front card-back">
                        <i class="far fa-question-circle"></i>
                    </div>
                </div>
            </div>
        `)
        if (i % 2 == 1) img.splice(0, 1);
    }
    cards.sort(() => Math.random() - 0.5);
    tablero.innerHTML = cards.join(" ");
}

const getRandom = () => {
    const random = Math.floor(Math.random() * icons.length);
    if(img.indexOf(random) == -1){
        return random;
    }else {
        return getRandom();
    }
}

const select = (card) => {
    let cardSelected = document.getElementById("cards-" + card);
    if(cardSelected.style.transform != "rotateY(180deg)"){
        if(selected.length < 2) {
            cardSelected.style.transform = "rotateY(180deg)";
            selected.push(card);
            if(selected.length == 2) deselect(selected);
        }
    }
}

const deselect = (cardsSelected) => {
    setTimeout(() => {
        tries ++;
        let card1 = document.getElementById("back-" + cardsSelected[0])
        let card2 = document.getElementById("back-" + cardsSelected[1])
        if(card1.innerHTML != card2.innerHTML){
            selected = [];
            let cardOne = document.getElementById("cards-" + cardsSelected[0])
            let cardTwo = document.getElementById("cards-" + cardsSelected[1])
            cardOne.style.transform = "rotateY(0deg)";
            cardTwo.style.transform = "rotateY(0deg)";
        }else{
            card1.style.background = "green";
            card2.style.background = "green";
            selected = [];
            pairs ++;
            if(pairs == 8){
                tablero.innerHTML = `
                    <div class="text-center">
                        <h3>Juego terminado!</h3>
                        <h5>Gracias por jugar</h5>
                        <p>Intentos realizados: <span class="text-muted fw-bold">${tries}</span></p>
                    </div>
                `;
                buttonStart.style.display = 'block';
            }
        }
    }, 1000);
}