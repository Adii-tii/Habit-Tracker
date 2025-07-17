import React, { useState } from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

import { auth } from "../firebase";

const AuthModal = ({ type = "login", onClose }) => {
  const isSignup = type === "signup";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleAuth = async () => {
    try {
      setError("");
      if (isSignup) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, {
          displayName: name || username,
        });
        alert("Signup successful!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful!");
      }
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      alert("Google login successful!");
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 transition-opacity duration-300 ease-out animate-fade-in">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl flex flex-col md:flex-row overflow-hidden relative transform transition-all duration-300 ease-out scale-95 animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-gray-400 hover:text-red-500 text-2xl font-bold z-10"
        >
          ×
        </button>

        {/* 🔐 Form Section */}
        <div className="flex-1 p-8">
          <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-2">
            {isSignup ? "Create Account" : "Welcome back " } <span className={"text-yellow-500"}> looper </span>
          </h2>
          
          <p className="text-sm text-gray-500 text-center mb-6">
            {isSignup ? "Join the habit revolution today!" : "Log in to continue your journey."}
          </p>

          {error && (
            <div className="bg-red-100 text-red-700 px-3 py-2 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAuth();
            }}
          >
            {isSignup && (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name here"
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600 mb-1">Username</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </>
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
              <input
                type="email"
                placeholder="looper@gmail.com"
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
              <input
                type="password"
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-100 hover:text-black transition-all duration-200"
            >
              {isSignup ? "Sign Up" : "Log In"}
            </button>
          </form>

          <div className="my-6 text-center text-gray-500 text-sm">or</div>

          <button
            onClick={handleGoogleSignIn}
            className="w-full border border-gray-300 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="w-5 h-5"
            />
            <span className="text-gray-700 text-sm font-medium">Continue with Google</span>
          </button>
        </div>

        {/* 📣 Right Side: Visual/Message */}
        <div className="hidden md:flex flex-1 bg-black flex-col justify-center items-center text-center p-6">
  <div className="relative w-[250px] h-[250px]">
    {/* Central black core */}
    <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-yellow-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-xl z-10" />

    {/* Orbiting Balls */}
    <div className="orbit-container">
          <div className="orbit orbit1">
            <div className="ball bg-yellow-500" />
          </div>
          <div className="orbit orbit2">
            <div className="ball bg-yellow-500" />
          </div>
          <div className="orbit orbit3">
            <div className="ball bg-yellow-500" />
          </div>
        </div>
      </div>
    </div>


      </div>
    </div>
  );
};

export default AuthModal;
