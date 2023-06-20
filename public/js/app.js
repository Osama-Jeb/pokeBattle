//todo : GAME OVER or GAME WON conditions
//todo : Play Again ??
//todo : FIX style for attack div and HP displays
//todo : more attacks for both pokemons
//todo : add attack misses for hero
//todo : attack PP & special animations for each attack
//todo : initiative
//todo : evilHealBite doesnt modify enemy health
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
        let rand = Math.round(Math.random()) + 0.5;
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
        // let rand = Math.round(Math.random() * 2)
        let rand = 2;
        switch (rand) {
            case 0:
                this.evilTackle(hero)
                break;
            case 1:
                this.evilFlail(hero);
                break
            case 2:
                this.evilSlam(hero);
                break;


            default:
                setTimeout(() => {
                    choicesScreen.innerHTML = `${this.name} missed an attack.`
                }, 2000);

                setTimeout(() => {
                    choicesScreen.innerHTML = attackScreen
                }, 4000);

                break;
        }
    }
    evilTackle(hero) {
        let tackleAtk = this.attack * 1.5;
        hero.health -= tackleAtk;
        let atkInfo = `${this.name} attacks ${hero.name} with EVIL TACKLE for ${tackleAtk} damage points`
        setTimeout(() => {
            choicesScreen.innerHTML = atkInfo;
            heroHP.style.width = `${hero.health}%`
            progBarHero();
        }, 2000);

        setTimeout(() => {
            choicesScreen.innerHTML = attackScreen
        }, 4000);
    }

    evilFlail(hero) {
        let flailAtk = this.attack * (Math.round(Math.random()) + 0.5);
        hero.health -= flailAtk;
        let atkInfo = `${this.name} attacks ${hero.name} with EVIL FLAIL for ${flailAtk} damage points`
        setTimeout(() => {
            choicesScreen.innerHTML = atkInfo;
            heroHP.style.width = `${hero.health}%`
            progBarHero();
        }, 2000);

        setTimeout(() => {
            choicesScreen.innerHTML = attackScreen
        }, 4000);
    }

    evilSlam(hero) {
        let slamAtk = this.attack * 2;
        hero.health -= slamAtk;
        this.health -= 5;
        enemyHP.style.width = `${this.health}%`
        progBarEnemy();


        let atkInfo = `${this.name} attacks ${hero.name} with EVIL SLAM for ${slamAtk} damage points but takes 5 damage`
        setTimeout(() => {
            choicesScreen.innerHTML = atkInfo;
            heroHP.style.width = `${hero.health}%`
            progBarHero();
        }, 2000);

        setTimeout(() => {
            choicesScreen.innerHTML = attackScreen
        }, 4000);
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
                ball.addEventListener("animationend", () => {
                    ball.classList.remove("ballMotion");
                })
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
// my h2 that displays the pokemon's name
let enemyName = document.querySelector(".enemyName");
let heroName = document.querySelector(".heroName");

let slamImg = document.querySelector(".atkOrange");
let tackleImg = document.querySelector(".atkPurple");
let flailImg = document.querySelector(".atkWhite");
let biteImg = document.querySelector(".atkRed");

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
            attackingBg(tackleImg);

            choice.tackle(enemy);
            
            gameEnd();

            enemy.enemyAttack(choice);
        }
        if (target.classList.contains("bite")) {
            heroAtkAnimation();
            attackingBg(biteImg);

            choice.bite(enemy);
            gameEnd();

            enemy.enemyAttack(choice);
        }
        if (target.classList.contains("flail")) {
            heroAtkAnimation();
            attackingBg(flailImg);

            choice.flail(enemy);
            gameEnd();

            enemy.enemyAttack(choice);
        }
        if (target.classList.contains("slam")) {
            heroAtkAnimation();
            attackingBg(slamImg);
            choice.slam(enemy);

            slamImg.classList.add("slamHit");

            slamImg.addEventListener("animationend", () => {
                slamImg.classList.remove("slamHit");
            })

            gameEnd();

            enemy.enemyAttack(choice);
        }
    }
})

const attackingBg = (myImg) => {
    myImg.classList.add("atkAniBg")
    myImg.classList.remove("d-none");
    myImg.addEventListener("animationend", () => {
        myImg.classList.remove("atkAniBg");
        myImg.classList.add("d-none");
    })
}

const heroAtkAnimation = () => {
    heroImg.classList.add("atkAni");
    heroImg.addEventListener("animationend", () => {
        heroImg.classList.remove("atkAni");
    })

    enemyImg.classList.add("enemyGotHit");
    enemyImg.addEventListener("animationend", () => {
        enemyImg.classList.remove("enemyGotHit");
    })
}

const chosenHero = (pokemon) => {
    let pokeImg = document.createElement("img");
    pokeImg.setAttribute("src", `./public/img/${pokemon}Back.gif`)
    pokeImg.setAttribute("alt", `${pokemon}Back`)
    pokeImg.style.position = "absolute";
    pokeImg.style.height = "200px"

    battleScreen.firstElementChild.insertAdjacentElement("afterend", pokeImg);
    heroImg = document.querySelector(`img[alt="${pokemon}Back"]`);
    heroImg.classList.add("hero-slide");

    heroImg.addEventListener("animationend", () => {
        heroImg.classList.remove("hero-slide");
        heroImg.style.bottom = "0%"
        heroImg.style.left = "25%"
    })
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
    enemyImg.style.top = "5%"
    enemyImg.style.right = "25%";

    enemyImg.addEventListener("animationend", () => {
        enemyImg.classList.remove("enemy-slide");
    })
}

const gameEnd = () => {
    if (choice.health <= 0) {
        setTimeout(() => {
            alert("You Lose");
            location.reload();
        }, 3000);
    } else if (enemy.health <= 0) {
        setTimeout(() => {
            alert("You win")
            location.reload();
        }, 3000);
    }

}