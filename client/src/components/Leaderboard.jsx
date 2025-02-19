//client\src\components\Leaderboard.jsx
import { useEffect, useState } from 'react';

export default function LeaderboardTable() {
  const [leaderboard, setLeaderboard] = useState([]);

  // Fetch leaderboard data
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/stats/leaderboard`)
  .then((res) => res.json())
  .then((data) => setLeaderboard(data))
  .catch((err) => console.error(err));
  }, []);

  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="border border-gray-300 p-2">Rank</th>
          <th className="border border-gray-300 p-2">Username</th>
          <th className="border border-gray-300 p-2">Karma Points</th>
        </tr>
      </thead>
      <tbody>
        {leaderboard.map((user, index) => (
          <tr key={user._id} className="text-center">
            <td className="border border-gray-300 p-2">{index + 1}</td>
            <td className="border border-gray-300 p-2">{user.username}</td>
            <td className="border border-gray-300 p-2">{user.karma}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}