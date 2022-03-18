class Ship {

    constructor(names, maxHealth, damageTake) {
        this.names = names;
        this.maxHealth = maxHealth;
        this.damageTake = damageTake;
        this.currentHealth = maxHealth;
        this.healthPercentage = 100;
        this.healthStatus = "healthy"
        this.alive = true;
        this.takeDamageSound = new Audio("sounds/hitMotherShip.mp3")
    }

    copyConstructor(ship) {
        this.names = ship.names;
        this.maxHealth = ship.maxHealth;
        this.damageTake = ship.damageTake;
        this.currentHealth = ship.maxHealth;
        this.healthPercentage = 100;
        this.healthStatus = "healthy"
        this.alive = true;

    }

    takeDamage() {
        //why didn't overloding this work? //  TakeDamage(amount) 
        this.changeHealth(this.damageTake);
        this.playTakeDamageSound()
    }

    playTakeDamageSound() {
        if (this.names === "Mother-ship 0")
            this.takeDamageSound.play()

    }
    changeHealth(amount) {
        this.currentHealth -= amount
        this.checkHealthPercentage()
        this.checkDeath()
    }

    checkDeath() {
        if ((this.currentHealth <= 0)) {
            this.alive = false
            this.currentHealth = 0;
            console.log(`${this.names} has died`)
        }
        else
            this.alive = true
    }

    returnState() {
        return this.alive;
    }

    reset() {
        changeHealth(!this.maxHealth)
    }

    checkHealthPercentage() {
        this.healthPercentage = (this.currentHealth / this.maxHealth) * 100
        this.status();
    }

    status() {
        if (this.healthPercentage >= 100)
            this.healthStatus = "healthy"
        else if (this.healthPercentage > 75)
            this.healthStatus = "lightly damaged"
        else if (this.healthPercentage > 50)
            this.healthStatus = "moderately damaged"
        else if (this.healthPercentage > 25)
            this.healthStatus = "heavily damaged"
        else if (this.healthPercentage > 0)
            this.healthStatus = "near death"
        else if (this.healthPercentage <= 0)
            this.healthStatus = "dead"

        console.log(`The ${this.names} is ${this.healthStatus}`);
    }
}

const createHealthbar = (domElement, setNames) =>{
    var healthbar = document.createElement("div");
    var bar = document.createElement("div");
    var hit = document.createElement("div");
    
    healthbar.classList.add("health-bar");
    healthbar.setAttribute('data-total',100)
    healthbar.setAttribute('data-value',100)
    healthbar.setAttribute('data-name',setNames)
    bar.classList.add("bar");
    hit.classList.add("hit");
    
    domElement.appendChild(healthbar);
    healthbar.appendChild(bar);
    bar.appendChild(hit);
    }

    const updateHealthbar = (nameString) =>{
        var healthbar = document.querySelector(`[data-name="${nameString.names}"]`)
        var hit = healthbar.querySelector('.hit')
        hit.style.width = `${inversePercentage(nameString.healthPercentage)}%`;
    }

    const inversePercentage = (number) =>{
        return 100 - number;
    }

const setup = () => {
    restartBtn.disabled = true;
    fireBtn.disabled = false;
    shipGraveyard = new Array()
    shipsInGame = new Array();

    hideUnhide(fireworkCanvas)
    spawn(ship1, 1);
    spawn(ship2, 5);
    spawn(ship3, 8);
}

const fire = () => {
    target = shipsInGame[getRandomInt(shipsInGame.length - 1)]
    console.log(`firing on ${target.names}`)
    target.takeDamage()
    console.log(`${target.names} health is now ${target.currentHealth}`)
    fireSound.play()
    updateHealthbar(target)

    console.log("fire");
    shipsInGame[getRandomInt(shipsInGame.length - 1)].takeDamage();
    removeTheDead()
}

const hideUnhide = (element) => {

    if (element.style.display === "none") {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
}

const removeTheDead = () => {
    if (shipsInGame.length > 0) {
        for (let index = 0; index < shipsInGame.length; index++) {

            if (shipsInGame[index].healthStatus.includes("dead")) {
                console.log(`${shipsInGame[index].names} has been destroyed`)
                shipGraveyard.push(shipsInGame[index])
                shipsInGame.splice(index, 1)
            }
            else {
            }
        }
        let motherShipIsAlive = false;
        for (let index = 0; index < shipsInGame.length; index++) {
            if (shipsInGame[index].names.includes(ship1.names)) {
                motherShipIsAlive = true
                console.log("mothership still alive")
            }
            else {

            }
        }

        if (!motherShipIsAlive) {
            fireBtn.disabled = true
            restartBtn.disabled = false;
            console.log("mothership is dead")
            shipsInGame.forEach(element => {
                element.changeHealth(element.maxHealth)
            });
            hideUnhide(fireworkCanvas)
            resetVisuals()
        }
    }
}


const spawn = (ships, quantity)  => { 
    let orginalArrayLength = shipsInGame.length;
    console.log(orginalArrayLength)

    let row = document.createElement("div");
    row.classList.add("grid-container")
    row.classList.add(ships.names + quantity)
    row.classList.add("row")
    document.body.appendChild(row);
    

    for (let index = 0; index < quantity; index++) {

        shipsInGame[index + orginalArrayLength] = new Ship("Defaut", 0, 0)
        shipsInGame[index + orginalArrayLength].copyConstructor(ships)
        shipsInGame[index + orginalArrayLength].names += ' ' + index.toString()

        let instantiateShip = document.createElement("div");
        instantiateShip.classList.add("grid-item");
        instantiateShip.classList.add("col");
        instantiateShip.innerHTML= shipsInGame[index + orginalArrayLength].names;
        row.appendChild(instantiateShip);

        createHealthbar(instantiateShip, shipsInGame[index + orginalArrayLength].names);

    }


    console.log(shipsInGame);
}

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max)
}

const resetVisuals = () => {
    var el = document.getElementsByClassName("grid-container")
    var length = el.length;
    for (let index = 0; index < length; index++) {
        console.log(el)
        el[0].remove()
    }
    
}

//let ship = new Ship()[3]
let visualRows = new Array();
let ship1 = new Ship("Mother-ship", 100, 9)
let ship2 = new Ship("Defence-ship", 80, 10)
let ship3 = new Ship("Attack-ship", 45, 12)
let fireBtn = document.getElementById("fireBtn");
let restartBtn = document.getElementById("restartBtn");
let fireworkCanvas = document.getElementById("canvas");
let fireSound = new Audio("sounds/laser-fire.mp3")

let shipGraveyard = new Array()
let shipsInGame = new Array();

setup();

// var catDiv = document.createElement("div");
// catDiv.innerHTML = "Test12";
// document.body.appendChild(catDiv);