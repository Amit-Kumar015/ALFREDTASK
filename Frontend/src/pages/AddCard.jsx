import React, { useState } from "react";
import axios from "axios";

function AddCard() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const token = localStorage.getItem("token"); // Get JWT from localStorage

            const response = await axios.post(
                "http://localhost:8000/api/flashcards",
                { question, answer },
                { headers: { Authorization: `Bearer ${token}` } } // Include token in headers
            );

            if (response.status === 200) {
                setMessage("Card added successfully!");
                setTimeout(() => {
                    setMessage("")
                }, 2000);
                
                setQuestion("");
                setAnswer("");
            }
        } catch (error) {
            setMessage("Error adding card. Please try again.");
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-w-2xl mx-auto bg-gray-900 text-white p-10 rounded-lg shadow-2xl">
            <h2 className="text-3xl font-bold mb-6 text-center">Add New Card</h2>

            {message && <p className="mb-4 text-green-400 text-center">{message}</p>}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block mb-2 font-semibold text-xl">Question:</label>
                    <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-400 text-lg"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-2 font-semibold text-xl">Answer:</label>
                    <textarea
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-400 text-lg h-20"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-lg text-xl"
                    disabled={loading}
                >
                    {loading ? "Adding..." : "Add Card"}
                </button>
            </form>
        </div>
    );
}

export default AddCard;

