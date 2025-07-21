import { Link } from "react-router-dom";
import image from "../../assets/image.png";

function LandingPage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center px-4 text-white"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="bg-gradient-to-r from-amber-900/80 via-orange-700/80 to-rose-600/80 p-8 rounded-xl shadow-xl text-center max-w-xl backdrop-blur-sm">
        <h1 className="text-4xl font-bold mb-4">Welcome to Clonotion!</h1>
        <p className="mb-6 text-white text-md">
          Collaborate seamlessly, write beautifully. Join your team in real-time
          and turn ideas into impactful documents.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/signup"
            className="bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600 font-medium"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="bg-amber-400 text-white px-4 py-2 rounded-lg hover:bg-amber-500 font-medium"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
