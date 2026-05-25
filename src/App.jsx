import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">

      <div className="bg-zinc-900 border border-zinc-800 px-12 py-10 rounded-3xl shadow-2xl text-center">

        <h1 className="text-6xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-pulse">
          Tailwind Installed ⚡
        </h1>

        <p className="text-zinc-400 mt-4 text-lg">
          Your Vite + React + Tailwind setup is working perfectly.
        </p>

        <button className="mt-8 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white font-semibold shadow-lg hover:scale-105">
          Lets Build 🚀
        </button>

      </div>

    </div>
  );
}

export default App;