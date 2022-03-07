const grid = document.querySelector('.grid')
const resultsDisplay = document.querySelector('.results')
let currentShooterIndex = 202
let width = 15 
let direction = 1
let hostileId
let goingRight = true

for (let i = 0; i < 225; i++) {
    const square = document.createElement('div')
    grid.appendChild(square)
}

const squares = Array.from(document.querySelectorAll('.grid div'))

const hostileAliens = [
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39
]

function draw() {
    for (let i = 0; i < hostileAliens.length; i++) {
        squares[hostileAliens[i]].classList.add('hostile')
    }
}

draw()

function remove() {
    for (let i = 0; i < hostileAliens.length; i++) {
        squares[hostileAliens[i]].classList.remove('hostile')
    }
}




squares[currentShooterIndex].classList.add('shooter')

function moveShooter(e) {
    squares[currentShooterIndex].classList.remove('shooter')
    switch(e.key) {
        case 'ArrowLeft':
            if (currentShooterIndex % width !== 0) currentShooterIndex -=1
            break
            case 'ArrowRight':
                if (currentShooterIndex % width < width -1) currentShooterIndex +=1
                break
    }
    squares[currentShooterIndex].classList.add('shooter')
}
document.addEventListener('keydown', moveShooter)

function moveHostile() {
    const leftEdge = hostileAliens[0] % width === 0
    const rightEdge = hostileAliens[hostileAliens.length - 1] % width === width -1
    remove()


    if (rightEdge && goingRight) {
        for (let i = 0; i < hostileAliens.length; i++) {
        hostileAliens[i] += width -1
        direction = -1
        goingRight = false;
       } 
    }

    if(leftEdge && !goingRight) {
        for (let i = 0; i < hostileAliens.length; i++) {
            hostileAliens[i] += width -1
            direction = 1
            goingRight = true
        }
    }



    for (let i = 0; i < hostileAliens.length; i++) {
        hostileAliens[i] += direction
    }

    draw()

    if (squares[currentShooterIndex].classList.contains('hostile', 'shooter')) {
        resultsDisplay.innerHTML = 'GAME OVER'
        clearInterval(hostileId)
    }
    
    for (let i = 0; i < hostileAliens.length; i++) {
        if(hostileAliens[i] > (squares.length)) {
            resultsDisplay.innerHTML = 'GAME OVER'
            clearInterval(invadersId)
        }
    }

}

hostileId = setInterval(moveHostile, 100)

function shooter(e) {
    let laserId
    let currentShooterIndex = currentShoterIndex
    function moveLaser() {
    squares[currentLaserIndex].classList.remove('laser')
    currentLaserIndex -= width
    squares[currentLaserIndex].classList.add('laser')
   }
}