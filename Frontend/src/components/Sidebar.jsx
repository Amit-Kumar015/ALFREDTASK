import React from "react";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

function Sidebar() {
    const navigate = useNavigate()

    return (
        <div className="w-1/5 h-screen bg-neutral-900 text-white p-5 flex flex-col">
            <div className="flex justify-between items-center mb-10 mt-3">
                <h2 className="text-xl font-bold cursor-pointer" onClick={() => navigate("/")}>Home</h2>
                <DarkModeToggle />
            </div>

            {/* Add Card Button */}
            <button className="mb-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded cursor-pointer" onClick={() => navigate("/add")}>
                + Add Card
            </button>

            <ul className="space-y-3">
                <li className="cursor-pointer p-2 hover:bg-gray-700 rounded" onClick={() => navigate("/allcards")}>All Cards</li>
                {[1, 2, 3, 4, 5].map((level) => (
                    <li key={level} className="cursor-pointer p-2 hover:bg-gray-700 rounded" onClick={() => navigate(`/cardlevel/${level}`)}>
                        Level {level}
                    </li>
                ))}
            </ul>
        </div>
    );

}

export default Sidebar;