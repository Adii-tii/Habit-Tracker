import React, { useState } from "react";
import { useUser } from "./UserContext.jsx";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

import { auth } from "../firebase";

const AuthModal = ({ type = "login", onClose, onSuccess, onSwitch }) => {
  const { setUser } = useUser();
  const isSignup = type === "signup";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleAuth = async () => {
    console.log(type);
    try {
      setError("");
      if (isSignup) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, {
          displayName: name || username,
        });
        try {
          const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
          const res = await fetch(`${API_BASE_URL}/api/users/register`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name:username, email, password }),
          });

          const data = await res.json();
          if (res.ok) {
            console.log('Sign up successful:', data);
            setUser(data.user);
            alert("Signup successful!");
            onClose();
            onSuccess?.();
          } else {
            console.error('Login failed:', data.message);
            alert(`Signup failed! ${data.message}`);
          }
        } catch (err) {
          console.error('Error:', err);
          alert(`Signup failed! Something went wrong`);
        }
      
      } else {
        try {
          const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
          const res = await fetch(`${API_BASE_URL}/api/users/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });

          const data = await res.json();
          if (res.ok) {
            console.log('Login successful:', data);
            setUser(data.user);
            alert("Login successful!");
            onClose();
            onSuccess?.();
          } else {
            console.error('Login failed:', data.message);
            alert(`Login failed! ${data.message}`);
          }
        } catch (err) {
          console.error('Error:', err);
          alert('Login failed something went wrong');
        }
        
      }
      ;
    } catch (err) {
      setError(err.message);
    }
  }; 

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      setError("");
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Register user with backend
      try {
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
        const res = await fetch(`${API_BASE_URL}/api/users/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            name: user.displayName || user.email?.split('@')[0] || 'User',
            email: user.email,
            password: 'google-auth-user', // Placeholder password for Google users
            googleId: user.uid
          }),
        });

        const data = await res.json();
        if (res.ok) {
          console.log('Google sign up successful:', data);
          setUser(data.user);
          alert("Google sign up successful!");
          onClose();
          onSuccess?.();
        } else if (res.status === 400 && data.message?.includes('already exists')) {
          // User already exists, try to login
          const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
          const loginRes = await fetch(`${API_BASE_URL}/api/users/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              email: user.email,
              password: 'google-auth-user'
            }),
          });
          
          const loginData = await loginRes.json();
          if (loginRes.ok) {
            console.log('Google login successful:', loginData);
            setUser(loginData.user);
            alert("Google login successful!");
            onClose();
            onSuccess?.();
          } else {
            console.error('Google login failed:', loginData.message);
            alert(`Google login failed! ${loginData.message}`);
          }
        } else {
          console.error('Google sign up failed:', data.message);
          alert(`Google sign up failed! ${data.message}`);
        }
      } catch (err) {
        console.error('Backend error:', err);
        alert('Google authentication failed! Please try again.');
      }
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
          {/* Switch to login link for signup mode */}
          {isSignup && (
            <div className="mt-4 text-center text-sm text-gray-500">
              Already a user?{' '}
              <button
                type="button"
                className="text-yellow-600 hover:underline font-semibold"
                onClick={() => onSwitch && onSwitch()}
              >
                Click here
              </button>
              .
            </div>
          )}

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
