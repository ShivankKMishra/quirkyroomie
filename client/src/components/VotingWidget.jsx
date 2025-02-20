//client\src\components\VotingWidget.jsx
import { useState } from 'react';

export default function VotingWidget({ complaintId, initialVotes, onVote }) {
  const [votes, setVotes] = useState(initialVotes);

  const handleVote = async (voteType) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/complaints/${complaintId}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ vote: voteType }),
      });

      const data = await response.json();
      if (response.ok) {
        setVotes(data.complaint.votes);
        onVote(data.complaint, data.punishment); // Notify parent component
      } else {
        alert(data.message || 'Failed to vote');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while voting');
    }
  };

  return (
    <div className="flex items-center gap-3">
      {/* Upvote Button */}
      <button
        onClick={() => handleVote(1)}
        className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg shadow-md transition-all duration-200"
      >
        👍
      </button>

      {/* Vote Count Display */}
      <span className="text-lg font-semibold text-gray-900 bg-gray-200 px-4 py-2 rounded-md shadow">
        {votes}
      </span>

      {/* Downvote Button */}
      <button
        onClick={() => handleVote(-1)}
        className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg shadow-md transition-all duration-200"
      >
        👎
      </button>
    </div>
  );
}
