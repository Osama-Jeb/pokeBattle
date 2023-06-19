//todo : GAME OVER or GAME WON conditions
//todo : Play Again ??
//todo : FIX style for attack div and HP displays
//todo : Ask Charaf about how to stop the click thingy
//todo : more attacks for both pokemons
//todo : add attack misses for hero
//todo : attack PP & special animations for each attack
//todo : initiative
//todo : Comments and easy to read code (this last)

let choicesScreen = document.querySelector(".choices-screen");
let attackScreen = choicesScreen.innerHTML;

let enemyHP = document.querySelector(".enemy-health");
enemyHP.style.width = "100%";

let heroHP = document.querySelector(".hero-health");
heroHP.style.width = "100%";

class Pokemon {
    constructor(name, attack, health) {
        this.name = name;
        this.attack = attack;
        this.health = health;
    }
    // need to separate hero functions and enemy functions cuz of the progress bar
    //^ HERO attacks
    tackle(opponent) {

        opponent.health -= this.attack;
        enemyHP.style.width = `${opponent.health}%`

        let info = `${this.name} attacks ${opponent.name} for ${this.attack} damage points`
        choicesScreen.innerHTML = info;
        setTimeout(() => {
            choicesScreen.innerHTML = attackScreen
        }, 2000);
    }
    bite(opponent) {
        opponent.health -= this.attack / 2;
        enemyHP.style.width = `${opponent.health}%`;
        this.health += this.attack / 2;
        heroHP.style.width = `${this.health}%`
    }

    //~ ENEMY attacks
    //~ just add more attack and let the rand take care of it
    enemyAttack(hero) {
        let rand = Math.round(Math.random() * 1)
        switch (rand) {
            case 0:
                this.evilTackle(hero)
                break;

            default:
                console.log(`${this.name} missed an attack.`);
                break;
        }
    }
    evilTackle(hero) {
        hero.health -= this.attack;
        heroHP.style.width = `${hero.health}%`
    }
}


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
                    ball.classList.remove("ballMotion");
                }, 1010);
                ball.parentElement.classList.remove("placing")
                mon.classList.remove("d-none");
                ball.classList.add("ballMotion");
                beginBtn.classList.remove("d-none");
            })
        }
    }
}

let battleFrame = document.querySelector(".battle");
let battleScreen = document.querySelector(".battle-screen");
let enemyName = document.querySelector(".enemyName");
let heroName = document.querySelector(".heroName");


let choice = "";
let enemy = "";
let heroImg = "";
let enemyImg = "";
beginBtn.addEventListener("click", () => {
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

    //: REMEMBER TO RANDOMIZE THE STATS
    heroName.textContent = choice.charAt(0).toUpperCase() + choice.slice(1);

    choice = new Pokemon(`${choice}`, 10, 100);

    enemyName.textContent = enemy.charAt(0).toUpperCase() + enemy.slice(1);
    enemy = new Pokemon(`${enemy}`, 10, 100);
    //! CHANGE DOCUMENT TO SOMETHING MORE SPECIFIC
    document.onclick = function (event) {
        let target = event.target
        if (target.classList.contains("tackle")) {
            actionAnimation();
            choice.tackle(enemy);

            //+ ENEMY ATTACK : ADD TIMEOUT, BELOW AS WELL

            enemy.enemyAttack(choice);
        }
        if (target.classList.contains("bite")) {
            actionAnimation();
            choice.bite(enemy);


            enemy.enemyAttack(choice);
        }
    }
})

const actionAnimation = () => {
    heroImg.classList.add("atkAni");
    setTimeout(() => {
        heroImg.classList.remove("atkAni");
    }, 1010);

    enemyImg.classList.add("enemyGotHit");
    setTimeout(() => {
        enemyImg.classList.remove("enemyGotHit");
    }, 1010);
}

// reCheck if you reaaally need a function inside a function
const chosenHero = (pokemon) => {
    displayHero(pokemon);

}

const displayHero = (pokemon) => {
    let pokeImg = document.createElement("img");
    pokeImg.setAttribute("src", `./public/img/${pokemon}Back.gif`)
    pokeImg.setAttribute("alt", `${pokemon}Back`)
    pokeImg.style.position = "absolute";
    pokeImg.style.height = "200px"

    battleScreen.firstElementChild.insertAdjacentElement("afterend", pokeImg);
    heroImg = document.querySelector(`img[alt="${pokemon}Back"]`);
    heroImg.classList.add("hero-slide");
    setTimeout(() => {
        heroImg.classList.remove("hero-slide");
        heroImg.style.bottom = "0%"
        heroImg.style.left = "15%"
    }, 2000);
}

const chosenEnemy = () => {
    let enemies = ["haunter", "meowth", "arbok"];
    let rand = Math.floor(Math.random() * enemies.length);
    enemy = enemies[rand];

    enemyImg = document.createElement("img");
    enemyImg.style.position = "absolute";
    enemyImg.style.height = "200px"

    enemyImg.setAttribute("src", `./public/img/${enemy}.gif`)
    enemyImg.setAttribute("alt", `enemyPoke`)
    battleScreen.firstElementChild.insertAdjacentElement("afterend", enemyImg);

    enemyImg.classList.add("enemy-slide");
    enemyImg.style.top = "15%"
    enemyImg.style.right = "15%";

    setTimeout(() => {
        enemyImg.classList.remove("enemy-slide");
    }, 2000);
}

