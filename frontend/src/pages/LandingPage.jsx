// src/pages/LandingPage.jsx
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Collaboration Tool</h1>
      <p className="text-gray-700 mb-6 text-center max-w-md">
        Create and edit documents with your team in real time. Sign up to get started or log in if you already have an account.
      </p>
      <div className="flex space-x-4">
        <Link
          to="/signup"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Sign Up
        </Link>
        <Link
          to="/login"
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
        >
          Log In
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
