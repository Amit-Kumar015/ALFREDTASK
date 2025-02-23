import React, { useState, useEffect } from "react";
import axios from "axios";
import CardComponent from "./Card";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DisplayCard = () => {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dueCount, setDueCount] = useState(0);

  useEffect( () => {
    const fetchFlashcards = async () => {
      try {
        const token = localStorage.getItem("token");
        
        const response = await axios.get("http://localhost:8000/api/flashcards", {
          headers: { Authorization: `Bearer ${token}` }, // Include token in request
        });
  
        const now = new Date();
        const filteredCards = response.data.data.filter((card) => {
          const reviewDate = new Date(card.nextReviewDate);
          return !isNaN(reviewDate) && reviewDate <= now;
        });
  
        setCards(filteredCards);
        setDueCount(filteredCards.length);
  
        // Show alert after setting due count
        if (filteredCards.length > 0) {
          toast.warn(`📌 You have ${filteredCards.length} cards due today!`, { position: "top-center" });
        } else {
          toast.success("✅ No due cards today!", { position: "top-center" });
        }
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };
  
    fetchFlashcards();
  }, []);


  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
    } else {
      toast.success("✅ All cards done!", { position: "top-center" });
    }
  };

  return (
    <div className="flex-1 flex justify-center items-center">
      {cards.length > 0 ? (
        <CardComponent card={cards[currentIndex]} onNext={handleNext} />
      ) : (
        <p className="text-xl font-bold">No due cards today!</p>
      )}
    </div>
  );
};

export default DisplayCard