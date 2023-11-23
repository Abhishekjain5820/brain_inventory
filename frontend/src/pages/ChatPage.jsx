// src/components/ChatPage.js
import  { useEffect, useState } from 'react';

const ChatPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Fetch the list of registered users from your API
        const response = await fetch('http://localhost:5001/auth/users', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setUsers(data.users);
        } else {
          setError(data.message || 'Error fetching users.');
        }
      } catch (error) {
        console.error('Error fetching users:', error.message);
        setError('Error fetching users. Please try again.');
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Chat Page</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {users.length > 0 ? (
        <ul className="grid grid-cols-1 gap-4">
          {users.map((user) => (
            <li
              key={user._id}
              className="bg-white p-4 rounded-md shadow-md hover:shadow-lg transition duration-300"
            >
              {user.name}
            </li>
          ))}
        </ul>
      ) : (
        <p>No registered users available.</p>
      )}
    </div>
  );
};

export default ChatPage;
