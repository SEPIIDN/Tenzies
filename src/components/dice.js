import React from "react";
import Dice1 from "../Images/Dice1.png"
import Dice2 from "../Images/Dice2.png"
import Dice3 from "../Images/Dice3.png"
import Dice4 from "../Images/Dice4.png"
import Dice5 from "../Images/Dice5.png"
import Dice6 from "../Images/Dice6.png"

export default function Die(props) {
    const clickedStyle = {
        filter: props.isHeld ? "cyan" : "white"
    }
    function getDice() {
        switch (props.value) {
            case 1:
                return Dice1
                break;
            case 2:
                return Dice2
                break;
            case 3:
                return Dice3
                break;
            case 4:
                return Dice4
                break;
            case 5:
                return Dice5
                break;
            case 6:
                return Dice6
                break;
        }
    }
    return (
        <div className="die-face"
            onClick={props.clickHandler}
        >
            <img
                className={props.isHeld ? "is-held" : " "}
                src={getDice()}
            />
        </div>
    )
}