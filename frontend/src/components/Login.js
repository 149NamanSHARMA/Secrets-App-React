import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
        email,
        password
      }, { withCredentials: true });
      console.log('Login successful:', response.data);
      navigate('/secrets');
    } catch (error) {
      console.error('Error during login:', error.response ? error.response.data : error.message);
    }
  };

  const handleGoogleSignIn = () => {
    window.location.href = `${process.env.REACT_APP_BACKEND_URL}/auth/google`;
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-darkblue">
      <div className="bg-primary p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-accent text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-secondary mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-secondary rounded"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-secondary mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-secondary rounded"
              required
            />
          </div>
          <button type="submit" className="btn-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded w-full">Login</button>
        </form>
        <div className="text-center mt-4">
          <button onClick={handleGoogleSignIn} className="btn-secondary hover:bg-primary text-white font-bold py-2 px-4 rounded w-full">
            <i className="fab fa-google mr-2"></i>Sign In with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
