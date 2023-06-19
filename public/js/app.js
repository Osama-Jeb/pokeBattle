//todo : GAME OVER or GAME WON conditions
//todo : Play Again ??
//todo : FIX style for attack div and HP displays
//todo : more attacks for both pokemons
//todo : add attack misses for hero
//todo : attack PP & special animations for each attack
//todo : initiative
//todo : progress bar less than 0%
//todo : Comments and easy to read code (this last)

let choicesScreen = document.querySelector(".choices-screen");
let attackScreen = choicesScreen.innerHTML;

let enemyHP = document.querySelector(".enemy-health");
enemyHP.style.width = "100%";

let heroHP = document.querySelector(".hero-health");
heroHP.style.width = "100%";

const progBarHero = () => {
    let heroScale = heroHP.style.width.slice(0, -1);
    heroScale = parseInt(heroScale)
    if (50 < heroScale) {
        heroHP.classList.add("bg-success");
        heroHP.classList.remove("bg-warning");
    } else if (heroScale <= 50) {
        heroHP.classList.remove("bg-success");
        heroHP.classList.add("bg-warning");
    }
    if (heroScale <= 20) {
        heroHP.classList.remove("bg-warning");
        heroHP.classList.add("bg-danger");
    }
}
const progBarEnemy = () => {
    let enemyScale = enemyHP.style.width.slice(0, -1);
    enemyScale = parseInt(enemyScale)
    if (50 < enemyScale) {
        enemyHP.classList.add("bg-success");
        enemyHP.classList.remove("bg-warning");
    } else if (enemyScale <= 50) {
        enemyHP.classList.remove("bg-success");
        enemyHP.classList.add("bg-warning");
    }
    if (enemyScale <= 20) {
        enemyHP.classList.remove("bg-warning");
        enemyHP.classList.add("bg-danger");
    }
}

class Pokemon {
    constructor(name, attack, health) {
        this.name = name;
        this.attack = attack;
        this.health = health;
    }
    // need to separate hero functions and enemy functions cuz of the progress bar
    //^ HERO attacks
    tackle(opponent) {
        let tackleAttack = this.attack * 1.5;

        opponent.health -= tackleAttack;
        //!!!!!!!!! DO SOMETHING ABOUT THIS SHIT. IT KEEPS REPEATING ON EVERY FUNCTION
        if (opponent.health <= 0) {
            enemyHP.style.width = `0%`
        } else {
            enemyHP.style.width = `${opponent.health}%`
        }

        let info = `${this.name} attacks ${opponent.name} with TACKLE for ${tackleAttack} damage points`
        choicesScreen.innerHTML = info;
        progBarEnemy();
    }
    bite(opponent) {
        let biteAttack = this.attack / 2
        opponent.health -= biteAttack / 2;

        if (opponent.health <= 0) {
            enemyHP.style.width = `0%`
        } else {
            enemyHP.style.width = `${opponent.health}%`
        }

        this.health += biteAttack / 2;
        if (this.health > 100) {
            this.health = 100
        }
        heroHP.style.width = `${this.health}%`

        let info = `${this.name} attacks ${opponent.name} with LEECH BITE for ${biteAttack} damage points and heals for ${biteAttack} points`
        choicesScreen.innerHTML = info;
        progBarEnemy();
    }

    flail(opponent) {
        let rand = Math.round(Math.random() * 2) + 0.5;
        let flailAttack = this.attack * rand

        opponent.health -= flailAttack;

        if (opponent.health <= 0) {
            enemyHP.style.width = `0%`
        } else {
            enemyHP.style.width = `${opponent.health}%`
        }

        let info = `${this.name} attacks ${opponent.name} with FLAIL for ${flailAttack} damage points`
        choicesScreen.innerHTML = info;
        progBarEnemy();
    }
    slam(opponent) {
        let slamAttack = this.attack * 2;
        opponent.health -= slamAttack;

        if (opponent.health <= 0) {
            enemyHP.style.width = `0%`
        } else {
            enemyHP.style.width = `${opponent.health}%`
        }

        this.health -= 5;
        heroHP.style.width = `${this.health}%`

        let info = `${this.name} attacks ${opponent.name} with SLAM for ${slamAttack} damage points. But took 5 damage points`
        choicesScreen.innerHTML = info;
        progBarEnemy();
        progBarHero();
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
                setTimeout(() => {
                    choicesScreen.innerHTML = `${this.name} missed an attack.`
                }, 1500);

                setTimeout(() => {
                    choicesScreen.innerHTML = attackScreen
                }, 3000);

                break;
        }
    }
    evilTackle(hero) {
        let tackleAtk = this.attack * 1.5;
        hero.health -= tackleAtk;
        let atkInfo = `${this.name} attacks ${hero.name} for ${tackleAtk} damage points`
        setTimeout(() => {
            choicesScreen.innerHTML = atkInfo;
            heroHP.style.width = `${hero.health}%`
            progBarHero();
        }, 1500);

        setTimeout(() => {
            choicesScreen.innerHTML = attackScreen
        }, 3000);
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
    choice = new Pokemon(`${heroName.textContent}`, 10, 100);

    enemyName.textContent = enemy.charAt(0).toUpperCase() + enemy.slice(1);
    enemy = new Pokemon(`${enemyName.textContent}`, 10, 100);
    //! CHANGE DOCUMENT TO SOMETHING MORE SPECIFIC
    document.onclick = function (event) {
        let target = event.target
        if (target.classList.contains("tackle")) {
            heroAtkAnimation();
            choice.tackle(enemy);

            enemy.enemyAttack(choice);
        }
        if (target.classList.contains("bite")) {
            heroAtkAnimation();
            choice.bite(enemy);

            enemy.enemyAttack(choice);
        }
        if (target.classList.contains("flail")) {
            heroAtkAnimation();
            choice.flail(enemy);

            enemy.enemyAttack(choice);
        }
        if (target.classList.contains("slam")) {
            heroAtkAnimation();
            choice.slam(enemy);

            enemy.enemyAttack(choice);
        }
    }
})

const heroAtkAnimation = () => {
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

