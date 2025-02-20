import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Leaderboard from './components/Leaderboard';
import ComplaintList from './components/ComplaintList';
import NewComplaint from './components/NewComplaint';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshComplaints, setRefreshComplaints] = useState(false); // State to trigger refresh

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token from localStorage
    setToken(null); // Update token state
  };

  // Function to open the modal
  const openModal = () => setIsModalOpen(true);

  // Function to close the modal and trigger complaints refresh
  const closeModal = () => {
    setIsModalOpen(false);
    setRefreshComplaints(prev => !prev); // Toggle state to trigger useEffect in ComplaintList
  };

  return (
    <Router>
      <Navbar token={token} handleLogout={handleLogout} />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start px-8 py-12">
        <Routes>
          {/* Public Routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setToken={setToken} />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              token ? (
                <div className="w-full max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8 space-y-6 relative">

                  {/* Plus Button for New Complaint */}
                  <button
                    onClick={openModal}
                    className="fixed bottom-8 right-8 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-full shadow-lg z-50"
                  >
                    +
                  </button>

                  {/* Modal for New Complaint */}
                  {isModalOpen && (
                    <div className="fixed inset-0  bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
                      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4">File a New Complaint</h2>
                        <NewComplaint token={token} closeModal={closeModal} />
                        <button
                          onClick={closeModal}
                          className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Leaderboard */}
                  <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Leaderboard</h2>
                    <Leaderboard />
                  </div>

                  {/* List of Complaints */}
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Complaints</h2>
                    <ComplaintList token={token} refresh={refreshComplaints} />
                  </div>
                </div>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}  
