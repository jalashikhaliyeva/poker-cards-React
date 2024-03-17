import React, { useEffect, useState } from "react";
import './Cards.css'

function Cards() {
  const [deckId, setDeckId] = useState("");
  const [cards, setCards] = useState([]);
  const [noCardsLeft, setNoCardsLeft] = useState(false);
  useEffect(() => {
    async function fetchDeckId() {
      const response = await fetch(
        "https://deckofcardsapi.com/api/deck/new/shuffle/"
      );
      const data = await response.json();
      console.log(data);
      setDeckId(data.deck_id);
    }
    fetchDeckId();
  }, []);

  const drawCard = async () => {
    if (!deckId) return;
    const response = await fetch(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/`
    );
    const data = await response.json();

    if (data.success) {
      const card = data.cards[0];
      setCards((prevCards) => [...prevCards, card]);
    } else {
      setNoCardsLeft(true);
      setCards([]);
    }
  };

  return (
    <div>
      <div className="container">
       <button className="btn" onClick={drawCard}>Gimme a Card !</button>

       
        {cards.length > 0 ? (
          <div className="card-stack">
            {cards.map((card, index) => (
              <img
              key={"card" + index}
              src={card.image}
              alt={card.code}
              className="card"
              style={{
                transform: `rotate(${
                  index % 2 === 0
                    ? Math.min(index * 20, 40)
                    : Math.max(index * -20, -40)
                }deg)`,
              }}
            />
            ))}
          </div>
        ) : (
          <p className="message">
            {noCardsLeft ? "No cards left in the deck" : "No card drawn yet"}
          </p>
        )}
       
      </div>
    </div>
  );
}

export default Cards;
