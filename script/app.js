const grid = document.querySelector('.grid')
let currentShooterIndex = 202

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

squares[currentShooterIndex].classList.add('shooter')