import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ShowCards() {
  const [cards, setCards] = useState([]);
  const navigate = useNavigate()

  // Fetch all cards from the database
  useEffect(() => {
    const token = localStorage.getItem("token"); // Get JWT from localStorage

    axios
      .get("http://localhost:8000/api/flashcards", {
        headers: { Authorization: `Bearer ${token}` }, // Include token in request
      })
      .then((response) => setCards(response.data.data))
      .catch((error) => console.error("Error fetching cards:", error));
  }, []);

  // Handle Delete Card
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/flashcards/${id}`);
      setCards((prevCards) => prevCards.filter((card) => card._id !== id)); // Remove from UI
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  // Handle Update Card
  const handleUpdate = (id) => {
    navigate(`/update/${id}`)
  };

  return (
    <div className="max-w-6xl mx-auto p-6 text-black dark:bg-gray-900 dark:text-white">
      <h2 className="text-3xl font-bold text-center mb-6">All Cards</h2>

      {cards.length === 0 ? (
        <p className="text-center text-lg text-gray-500">No cards available.</p>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {cards.map((card) => (
            <div key={card._id} className="relative bg-white px-6 pt-6 pb-3 rounded-lg shadow-gray-600 shadow-lg min-h-50 min-w-40">
              {/* Level Badge */}
              <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                Level {card.level}
              </span>
              
              <h3 className="text-xl text-black font-semibold my-3">{card.question}</h3>
              <p className="text-gray-900 my-2 mb-3 text-lg">Answer: {card.answer}</p>

              <div className="flex justify-between gap-10">
                <button
                  onClick={() => handleUpdate(card._id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                >
                  Update
                </button>

                <button
                  onClick={() => handleDelete(card._id)}
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ShowCards;
