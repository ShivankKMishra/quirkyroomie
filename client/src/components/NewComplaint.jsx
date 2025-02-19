//client\src\components\NewComplaint.jsx
import { useState, useEffect } from 'react';

export default function NewComplaint({ token }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('Noise');
  const [severity, setSeverity] = useState('Mild');
  const [users, setUsers] = useState([]); 
  const [againstUser, setAgainstUser] = useState('');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/users`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/complaints`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          type,
          severity,
          againstUser: againstUser || null,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Complaint filed successfully!');
      } else {
        alert(data.message || 'Failed to file complaint');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while filing the complaint.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <select value={type} onChange={(e) => setType(e.target.value)} className="w-full p-2 border rounded">
        <option>Noise</option>
        <option>Cleanliness</option>
        <option>Bills</option>
        <option>Pets</option>
      </select>
      <select value={severity} onChange={(e) => setSeverity(e.target.value)} className="w-full p-2 border rounded">
        <option>Mild</option>
        <option>Annoying</option>
        <option>Major</option>
        <option>Nuclear</option>
      </select>
      <select value={againstUser} onChange={(e) => setAgainstUser(e.target.value)} className="w-full p-2 border rounded">
        <option value="">Select a user (optional)</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            @{user.username}
          </option>
        ))}
      </select>
      <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        File Complaint
      </button>
    </form>
  );
}
