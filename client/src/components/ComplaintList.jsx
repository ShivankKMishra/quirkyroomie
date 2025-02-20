import { useEffect, useState } from 'react';
import VotingWidget from './VotingWidget';

export default function ComplaintList({ token, refresh }) {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/complaints`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('API Response:', data);
        if (Array.isArray(data)) {
          setComplaints(data);
        } else {
          console.error('API did not return an array:', data);
          setComplaints([]);
        }
      })
      .catch((err) => console.error(err));
  }, [token, refresh]); // Added refresh here

  const handleVote = (updatedComplaint) => {
    setComplaints((prev) =>
      prev.map((c) => (c._id === updatedComplaint._id ? updatedComplaint : c))
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {complaints.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No complaints found.</p>
      ) : (
        complaints.map((complaint) => (
          <div
            key={complaint._id}
            className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
          >
            {/* Complaint Title */}
            <h3 className="text-xl font-semibold text-gray-900">{complaint.title}</h3>

            {/* Description */}
            <p className="text-gray-700 mt-2">{complaint.description}</p>

            {/* Tags: Type & Severity */}
            <div className="flex items-center gap-3 mt-3">
              <span className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded-full">
                {complaint.type}
              </span>
              <span
                className={`px-3 py-1 text-sm font-medium text-white rounded-full ${
                  complaint.severity === 'Mild'
                    ? 'bg-green-500'
                    : complaint.severity === 'Annoying'
                    ? 'bg-yellow-500'
                    : complaint.severity === 'Major'
                    ? 'bg-orange-500'
                    : 'bg-red-600'
                }`}
              >
                {complaint.severity}
              </span>
            </div>

            {/* Against User */}
            {complaint.againstUser ? (
              <p className="mt-3 text-sm text-gray-600">
                🚨 **Against:** <span className="font-bold text-red-600">@{complaint.againstUser.username}</span>
              </p>
            ) : (
              <p className="mt-3 text-sm text-gray-500">Against: Not specified</p>
            )}

            {/* Votes & Status */}
            <div className="flex justify-between items-center mt-4">
              <p className="text-gray-600 text-sm">
                Status: <span className="font-bold">{complaint.resolved ? '✅ Resolved' : '⏳ Open'}</span>
              </p>

              {/* Voting Widget */}
              <VotingWidget
                complaintId={complaint._id}
                initialVotes={complaint.votes}
                onVote={handleVote}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
}
