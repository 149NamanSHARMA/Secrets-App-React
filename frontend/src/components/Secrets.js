import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Secrets = () => {
  const [secrets, setSecrets] = useState([]);
  const [secretText, setSecretText] = useState('');

  useEffect(() => {
    const fetchSecrets = async () => {
      console.log('Fetching secrets...');
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/secrets`, { withCredentials: true });
        console.log('Fetched secrets:', response.data);
        setSecrets(response.data);
      } catch (error) {
        console.error('Error fetching secrets:', error.response ? error.response.data : error.message);
      }
    };

    fetchSecrets();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/secrets`, {
        secretText
      }, { withCredentials: true });
      setSecrets([...secrets, response.data.secret]);
      setSecretText('');
    } catch (error) {
      console.error('Error submitting secret:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-accent">
      <h2 className="text-2xl font-bold mb-6 text-primary">Secrets</h2>
      <form onSubmit={handleSubmit} className="mb-6 w-full max-w-md">
        <input
          type="text"
          value={secretText}
          onChange={(e) => setSecretText(e.target.value)}
          className="w-full p-2 border border-secondary rounded mb-4"
          placeholder="Share your secret..."
          required
        />
        <button type="submit" className="btn-primary hover:bg-secondary text-accent font-bold py-2 px-4 rounded w-full">
          Submit
        </button>
      </form>
      <div className="w-full max-w-md">
        {secrets.map((secret) => (
          <div key={secret._id} className="bg-white p-4 rounded shadow-md mb-4">
            <p className="text-customBlack font-bold">{secret.text}</p>
          </div>
        ))}
      </div>
      <button onClick={() => window.location.href = '/'} className="btn-primary hover:bg-secondary text-accent font-bold py-2 px-4 rounded mt-4">
        Log Out
      </button>
    </div>
  );
}

export default Secrets;