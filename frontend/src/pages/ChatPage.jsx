/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChatPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (!localStorage.getItem("user")) {
          navigate("/");
          return;
        }

        // Using Axios to make the API request
        const response = await axios.get("http://localhost:5001/auth/users");

        const data = response.data;
        console.log(data);

        if (response.status === 200) {
          
          setUsers(data.users);
        } else {
          setError(data.message || "Error fetching users.");
        }
      } catch (error) {
        console.error("Error fetching users:", error.message);
        setError("Error fetching users. Please try again.");
      }
    };

    fetchUsers();
  }, [navigate]); // Include navigate in the dependency array to avoid the missing dependency warning

  const handleUserClick = (userId) => {
    // Replace '/user-profile' with the desired route and pass any necessary parameters
    navigate(`/chats/${userId}`);
  };

  return (
    
    <div className="max-w-md mx-auto my-8 p-4 bg-white rounded-md shadow-md">
      {error && <p className="text-red-500">{error}</p>}
      <ul className="divide-y divide-gray-300">
        <h1 className="text-center font-bold">List Of Users</h1>
        {users.map((user) => (
          <li key={user._id} className="py-4" onClick={() => handleUserClick(user._id)}>
            <div className="flex items-center">
              <div>
                <p className="text-lg font-semibold">{user.name}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatPage;
