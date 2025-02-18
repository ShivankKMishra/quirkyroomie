import { useState } from 'react';

export default function NewComplaint({ token }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('Noise');
  const [severity, setSeverity] = useState('Mild');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/complaints', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description, type, severity }),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option value="Noise">Noise</option>
        <option value="Cleanliness">Cleanliness</option>
        <option value="Bills">Bills</option>
        <option value="Pets">Pets</option>
      </select>
      <select
        value={severity}
        onChange={(e) => setSeverity(e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option value="Mild">Mild</option>
        <option value="Annoying">Annoying</option>
        <option value="Major">Major</option>
        <option value="Nuclear">Nuclear</option>
      </select>
      <button type="submit" className="bg-avocado-100 text-black p-2 rounded">
        File Complaint
      </button>
    </form>
  );
}