import React, { useEffect } from "react";
import Die from "./Die";
import Confetti from "react-confetti";

export default function App() {
  const [newDice, setNewDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  function allNewDice() {
    let arr = [];
    for (let i = 0; i < 10; i++) {
      let randNo = Math.ceil(Math.random() * 6);
      arr.push({ value: randNo, isHeld: false, id: i + 1 });
    }
    return arr;
  }
  let diceElements = newDice.map((diceVal, i) => (
    <Die
      key={i}
      value={diceVal.value}
      isHeld={diceVal.isHeld}
      id={diceVal.id}
      setNewDice={setNewDice}
    />
  ));

  function rollDice() {
    !tenzies
      ? setNewDice((oldDice) =>
          oldDice.map((diceElem) =>
            !diceElem.isHeld
              ? { ...diceElem, value: Math.ceil(Math.random() * 6) }
              : diceElem
          )
        )
      : setNewDice(allNewDice());
  }
  useEffect(() => {
    const checkTenzies = newDice.every(
      (elem) => elem.value == newDice[0].value && elem.isHeld
    );
    setTenzies(checkTenzies);
  }, [newDice]);

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button className="btn-roll" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
