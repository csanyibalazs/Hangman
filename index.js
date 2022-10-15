import { words, letters } from "./data.js";

const c = document.querySelector("canvas")
const ctx = c.getContext("2d")

// Gallow items array
const gallow = [
    {
        moveTo: {
            first: 120,
            second: 100
        },
        lineTo: {
            first: 180,
            second: 100
        },
        item: "line",
        active: false
    },
    {
        moveTo: {
            first: 120,
            second: 100
        },
        lineTo: {
            first: 120,
            second: 30
        },
        item: "line",
        active: false
    },
    {
        moveTo: {
            first: 120,
            second: 30
        },
        lineTo: {
            first: 150,
            second: 30
        },
        item: "line",
        active: false
    },
    {
        moveTo: {
            first: 150,
            second: 30
        },
        lineTo: {
            first: 150,
            second: 45
        },
        item: "line",
        active: false
    },
    {
        item: "circle",
        active: false
    },
    {
        moveTo: {
            first: 150,
            second: 55
        },
        lineTo: {
            first: 150,
            second: 80
        },
        item: "line",
        active: false
    },
    {
        moveTo: {
            first: 150,
            second: 60
        },
        lineTo: {
            first: 135,
            second: 70
        },
        item: "line",
        active: false
    },
    {
        moveTo: {
            first: 150,
            second: 60
        },
        lineTo: {
            first: 165,
            second: 70
        },
        item: "line",
        active: false
    },
    {
        moveTo: {
            first: 150,
            second: 80
        },
        lineTo: {
            first: 135,
            second: 90
        },
        item: "line",
        active: false
    },
    {
        moveTo: {
            first: 150,
            second: 80
        },
        lineTo: {
            first: 165,
            second: 90
        },
        item: "line",
        active: false
    }
]

// Drawing each gallow line
const drawGallowLine = (moveToFirst, moveToSecond, lineToFirst, lineToSecond) => {
    ctx.beginPath()
    ctx.moveTo(moveToFirst, moveToSecond)
    ctx.lineTo(lineToFirst, lineToSecond)
    ctx.stroke()
}

// Getting the word
const getWord = (array) => {
    return array[Math.floor(Math.random() * array.length)]
}

// Drawing the head
const drawGallowCircle = () => {
    ctx.beginPath()
    ctx.arc(150, 50, 5, 0, 2 * Math.PI)
    ctx.stroke()
}

// function for eventListeners
const handleClick = (word) =>{
    return word.split('')
}

//Check if win
const checkIfWin = (word) => {
    let result = ""
    Array.from(document.getElementById("word-container").childNodes).forEach(item => {
        result += item.innerText    
    })
    return word.toUpperCase() === result
}

// display win
const displayWin = () => {
    Array.from(document.getElementById("word-container").childNodes).forEach(item => {
        item.style.color = "#076107"
    })
}

// display lose
const displayLose = (word) => {
    Array.from(document.getElementById("word-container").childNodes).forEach((item, index) => {
        if(item.innerText === "    "){
            item.innerText = word.toUpperCase().split('')[index]
            item.style.color = "#de110d"
        }
    })
}

const startGame = () => {
    // Making the word for guess
    let mistake = 0
    let word = getWord(words)
    word.split('').map(char => {
        let letter = document.createElement("span")
        letter.innerText = "    "
        letter.classList.add("word-letter")
        document.getElementById("word-container").appendChild(letter)
    })
    // Making the letter buttons
    letters.map(letter => {
        let button = document.createElement("button")
        button.innerHTML = letter.toUpperCase()
        button.classList.add("letter-button")
        // eventListeners for letter-buttons
        button.addEventListener("click", event => {
            handleClick(word).map((letter, index) => {
                if(letter.toUpperCase() === event.target.innerText){
                    Array.from(document.getElementById("word-container").childNodes[index].innerText = letter.toUpperCase())
                }
            })
            // In case of no match
            if(!word.toUpperCase().split('').includes(event.target.innerText)){
                    gallow[mistake].active = true
                    // Mapping the gallow array
                    gallow.map(gallowItem => {
                        if(gallowItem.active){
                            if(gallowItem.item === "line"){
                                drawGallowLine(gallowItem.moveTo.first, gallowItem.moveTo.second, gallowItem.lineTo.first, gallowItem.lineTo.second)
                            } else drawGallowCircle()
                        } 
                    })
                    // In case of fail
                    if(mistake === gallow.length - 1){
                        document.querySelector("h1").innerText = "You lost!"
                        displayLose(word)
                        document.getElementById("button-container").remove()
                        document.getElementById("new-game-btn").style.display = "inline-block"
                        document.getElementById("new-game-btn").addEventListener("click", () => {
                            location.reload()
                        })
                        return
                    } else {
                        mistake++
                    }
            }
            // disable already used buttons
            event.target.style.backgroundColor = "black"
            event.target.disabled = true
            // check if win
            if(checkIfWin(word)){
                document.querySelector("h1").innerText = "You won!"
                displayWin()
                document.getElementById("button-container").remove()
                document.getElementById("new-game-btn").style.display = "inline-block"
                document.getElementById("new-game-btn").addEventListener("click", () => {
                    location.reload()
                })
            }
        })
        document.getElementById("button-container").appendChild(button)
    })
}

startGame()