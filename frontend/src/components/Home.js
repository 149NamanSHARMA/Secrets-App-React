import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-darkblue">
      <div className="text-center">
        <img src="/logo-white.svg" alt="Secrets Logo" className="w-80 h-80 mx-auto mb-4" />
        <p className="text-lg mb-8 text-secondary">Don't keep your secrets, share them anonymously!</p>
        <div className="flex justify-center space-x-4">
          <Link to="/register" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Register</Link>
          <Link to="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
