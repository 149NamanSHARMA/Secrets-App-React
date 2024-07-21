import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [secrets, setSecrets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSecrets = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/secrets`, { withCredentials: true });
        setSecrets(response.data);
      } catch (error) {
        console.error('Error fetching secrets:', error.response ? error.response.data : error.message);
      }
    };

    fetchSecrets();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/logout`, { withCredentials: true });
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h2 className="text-2xl font-bold mb-6">Secrets</h2>
      <div className="w-full max-w-md mb-6">
        {secrets.map((secret) => (
          <div key={secret._id} className="bg-white p-4 rounded shadow-md mb-4">
            <p>{secret.text}</p>
          </div>
        ))}
      </div>
      <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
        Log Out
      </button>
    </div>
  );
}

export default Dashboard;
