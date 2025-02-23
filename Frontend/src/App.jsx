import React from "react";
import { Outlet } from "react-router-dom"
import Sidebar from "./components/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate()

  return (
    <div className="flex h-screen dark:bg-gray-900 dark:text-white">
      <ToastContainer />
      <Sidebar />
      
      {/* Top Right Buttons */}
      <div className="absolute top-4 right-4 space-x-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={() => navigate('/signin')}>Sign In</button>
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" onClick={() => navigate('/signup')}>Sign Up</button>
      </div>

      <div className="flex-1 flex justify-center items-center">
        <Outlet/>
      </div>
    </div>
  );
}

export default App;