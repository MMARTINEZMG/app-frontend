import React, { useState } from "react";
import ReactConfetti from "react-confetti";
import axios from "axios";

const LoginPage = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isConfettiActive, setIsConfettiActive] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}login`, {
        email,
        password,
      });

      if (response.status === 200) {
        console.log("Login successful:", response.data);
        setIsConfettiActive(true);

        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1000);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex text-white">
      <div className="w-1/2 bg-[#1a1b1f] flex items-center justify-center p-12">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-left text-[#d7d9dd]">
            Login
          </h1>
          <form onSubmit={handleSubmit}>
            <label className="block mb-4">
              <span className="text-[#7d7a78] mb-2 block">E-mail</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#212327] w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6061df]"
                required
              />
            </label>
            <label className="block mb-6">
              <span className="text-[#7d7a78] mb-2 block">Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-[#212327] w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6061df]"
                required
              />
            </label>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
              type="submit"
              className={`w-full bg-[#A8FF53] text-black font-medium p-3 rounded-lg transition duration-300 ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
              }`}
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </form>
          <p className="text-sm mt-4 text-center text-gray-600">
            Don't have an account?{" "}
            <a
              href="#"
              className="text-[#6061df] hover:underline font-semibold"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>

      <div
        className="w-1/2 bg-[#15171a] flex items-center justify-center relative overflow-hidden"
        onMouseEnter={() => setIsConfettiActive(true)}
        onMouseLeave={() => setIsConfettiActive(false)}
      >
        {isConfettiActive && (
          <ReactConfetti
            width={window.innerWidth / 2}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={200}
            className="absolute top-0 left-0 pointer-events-none"
          />
        )}
        <div className="text-center p-8 z-10">
          <h2 className="text-4xl font-bold text-[#6061df] mb-4">
            ¡Impulsa tu Potencial!
          </h2>
          <p className="text-xl text-gray-700 mb-6">
            Cada inicio de sesión es un paso más cerca de tus metas. Juntos
            construimos el futuro, uno login a la vez.
          </p>
          <div className="text-sm text-gray-600 italic">
            "El éxito comienza con un simple inicio de sesión"
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
