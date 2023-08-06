import React from "react";

export default function Die(props) {
  return (
    <div
      className={`die-face ${props.isHeld && "held"} `}
      onClick={() =>
        props.setNewDice((oldDice) => {
          return oldDice.map((diceElem) =>
            diceElem.id == props.id
              ? { ...diceElem, isHeld: !diceElem.isHeld }
              : diceElem
          );
        })
      }
    >
      <h2 className="die-num">{props.value}</h2>
    </div>
  );
}
