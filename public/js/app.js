class Pokemon {
    constructor(name, attack, health) {
        this.name = name;
        this.attack = attack;
        this.health = health;
    }
}
// create 3 hero pokemons that the user will choose one from
let charmander = new Pokemon("Charmander", 100, 100);
let balbasaur = new Pokemon("Balbasaur", 100, 100);
let squirtle = new Pokemon("Squirtle", 100, 100);
// create 3 opponent pokemons that the user will fight one at random
let haunter = new Pokemon("Haunter", 100, 100);
let meowth = new Pokemon("Meowth", 100, 100);
let arbok = new Pokemon("Arbok", 100, 100);

let startScreen = document.querySelector(".start-screen");

let starterBalls = document.querySelectorAll('.start-pokeballs img');

let starterPoke = document.querySelectorAll(".start-pokemons .d-none");

// when I click the button, hide start screen & show battle screen
let beginBtn = document.querySelector(".beginGame");


for (let index = 0; index < starterBalls.length; index++) {
    let ball = starterBalls[index];
    let ballAlt = ball.alt
    for (let idx = 0; idx < starterPoke.length; idx++) {
        let mon = starterPoke[idx];
        let monAlt = mon.alt

        if (ballAlt == monAlt) {
            ball.addEventListener("click", () => {
                for (let i = 0; i < starterPoke.length; i++) {
                    let pokemon = starterPoke[i];
                    pokemon.classList.add("d-none");
                }
                setTimeout(() => {
                    ball.classList.remove("spin");
                }, 1010);
                ball.parentElement.classList.remove("placing")
                mon.classList.remove("d-none");
                ball.classList.add("spin");
                beginBtn.classList.remove("d-none");

            })
        }
    }
}

let battleFrame = document.querySelector(".battle");
let battleScreen = document.querySelector(".battle-screen");

// these are only temporary for testing
let enemyImg = document.querySelector('img[alt="enemyPoke"]')

beginBtn.addEventListener("click", () => {
    let choice = "";
    startScreen.classList.add("d-none");
    battleFrame.classList.remove("d-none");
    for (let index = 0; index < starterPoke.length; index++) {
        let pokemon = starterPoke[index];
        if (!pokemon.classList.contains("d-none")) {
            choice = pokemon.alt
            chosenHero(choice);
            chosenEnemy();
        }
    }

    console.log(choice);
})

// //§§ can modify pokemon's health with this
// let heroHealth = document.querySelector(".hero-health");
// heroHealth.style.width = "50%"

const chosenHero = (pokemon) => {
    displayHero(pokemon);
    
}

const displayHero = (pokemon) => {
    let pokeImg = document.createElement("img");
    pokeImg.setAttribute("src", `./public/img/${pokemon}Back.png`)
    pokeImg.setAttribute("alt", `${pokemon}Back`)
    pokeImg.style.position = "absolute";
    pokeImg.style.height = "250px"
    
    battleScreen.firstElementChild.insertAdjacentElement("afterend", pokeImg);
    let heroImg = document.querySelector(`img[alt="${pokemon}Back"]`);
    heroImg.classList.add("hero-slide");
}

const chosenEnemy = () => {
    let enemies = ["haunter", "meowth", "arbok"];
    let rand = Math.floor(Math.random() * enemies.length);
    let enemy = enemies[rand];

    let enemyImg = document.createElement("img");
    enemyImg.style.position = "absolute";
    enemyImg.style.height = "250px"

    enemyImg.setAttribute("src", `./public/img/${enemy}.png`)
    enemyImg.setAttribute("alt", `enemyPoke`)
    battleScreen.firstElementChild.insertAdjacentElement("afterend", enemyImg);

    let enemyTag = document.querySelector('img[alt="enemyPoke"]')
    enemyTag.classList.add("enemy-slide")
}

