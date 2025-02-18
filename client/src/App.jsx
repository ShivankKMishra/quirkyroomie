import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import NewComplaint from './components/NewComplaint';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [message, setMessage] = useState('');

  // Fetch test message from the backend
  useEffect(() => {
    fetch('/api/test')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setToken={setToken} />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            token ? (
              <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold text-avocado-100 mb-8">
                  {message || 'Loading...'}
                </h1>
                <NewComplaint token={token} />
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}