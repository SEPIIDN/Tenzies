import React from "react";
import Dice from "./dice";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
    const [dice, setDice] = React.useState(newDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [totalTries, SetTotalTries] = React.useState(0)
    const highScores = JSON.parse(localStorage.getItem("highscores")) || [{score:99}]
    

        function resetScores(){
            localStorage.clear()
        }
        React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const sameValue = dice.every(die => die.value === dice[0].value)
        if (allHeld && sameValue) {
            setTenzies(true)
        }
    }, [dice])
    function generateDie() {
        return {
            id: nanoid(),
            value: Math.ceil(Math.random() * 6),
            isHeld: false
        }
    }
    function newDice() {
        const diceArray = []
        for (let i = 0; i < 10; i++) {
            diceArray.push(generateDie())
        }
        return diceArray
    }
    function rollDice() {
        if (!tenzies) {
            SetTotalTries(totalTries + 1)
            setDice(prevDice => prevDice.map(die => {
                return die.isHeld ? die : generateDie()
            }))
        } else {
            const score = {
                score : totalTries
            }
            highScores.push(score)
            highScores.sort((a,b)=> a.score - b.score)
            highScores.splice(5)
            localStorage.setItem("highscores",JSON.stringify(highScores))
            setTenzies(false)
            setDice(newDice())
            SetTotalTries(0)
        }
    }
    function holdDice(id) {
        setDice(prevDice => prevDice.map(die => {
            return die.id === id ? { ...die, isHeld: !die.isHeld } : die
        }))
    }
    const diceElements = dice.map(die => {
        return <Dice
            key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            clickHandler={() => holdDice(die.id)}
        />
    })

    return (
        <main>
            <h1>best {highScores[0].score<99 && highScores[0].score}</h1>
            <h2 className="score">Total Rolls :{totalTries}</h2>
            <h1 className={tenzies ? "scale-up-center" : "GZ"}>CONGRATULATIONS!</h1>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <div className="dice-container">
                {diceElements}
            </div>
            <button className="roll-dice" onClick={rollDice}>{tenzies ? "Reset" : "Roll"}</button>
            <button onClick={resetScores}>Reset</button>
        </main>
    )
}