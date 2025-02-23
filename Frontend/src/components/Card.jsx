import React, { useState } from "react";
import axios from "axios";

const CardComponent = ({ card, onNext }) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  const updateCardLevel = async (newLevel) => {
    try {
      await axios.put(`http://localhost:8000/api/flashcards/${card._id}`, {
        newLevel: newLevel,
      });
    } catch (error) {
      console.error("Error updating card level:", error);
    }
  };

  const handleCheckAnswer = () => {
    const correct = userAnswer.trim().toLowerCase() === card.answer.toLowerCase();
    setIsCorrect(correct);
    
    const newLevel = correct ? Math.min(5, card.level + 1) : Math.max(1, card.level - 1);
    updateCardLevel(newLevel);
  };

  const handleNext = () => {
    handleCheckAnswer()
    setUserAnswer("");
    setShowAnswer(false);
    setIsCorrect(null);
    onNext();
  };

  return (
    <div className="flex flex-col items-center justify-center h-90 w-96 border-2 border-gray-300 rounded-lg shadow-lg p-5 ">
      {/* Question */}
      <p className="text-2xl font-bold mb-4 text-center">{card.question}</p>
      
      {/* Current Level Display */}
      <p className="text-lg font-semibold text-gray-700 mb-2">Level: {card.level}</p>

      {/* Answer Input */}
      <input
        type="text"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        className="border p-2 rounded w-full text-center my-2"
        placeholder="Type your answer..."
      />

      {/* Buttons */}
      <div className="flex gap-4 mt-4">
        <button
          onClick={() => setShowAnswer(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Show Answer
        </button>
        <button
          onClick={handleCheckAnswer}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Check Answer
        </button>
        <button
          onClick={handleNext}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Next Card
        </button>
      </div>

      {/* Answer Display */}
      {showAnswer && (
        <p className="mt-4 text-lg font-semibold text-blue-700">
          Answer: {card.answer}
        </p>
      )}

      {/* Answer Correct/Incorrect */}
      {isCorrect !== null && (
        <p className={`mt-4 text-lg font-semibold ${isCorrect ? "text-green-600" : "text-red-600"}`}>
          {isCorrect ? "Correct! Level Up!" : "Wrong! Level Down!"}
        </p>
      )}
    </div>
  );
};

export default CardComponent;
