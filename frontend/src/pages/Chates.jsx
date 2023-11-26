/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import io from "socket.io-client";
import { useParams } from "react-router-dom";

const socket = io("http://localhost:5001");

function Chates() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState(() => {
    // Retrieve messages from localStorage on component mount
    const storedMessages = localStorage.getItem("chatMessages");
    return storedMessages ? JSON.parse(storedMessages) : [];
  });

  useEffect(() => {
    const fetchUserById = async () => {
      try {
        // Assuming you have an API endpoint like '/api/users/:userId' on your server
        const response = await fetch(
          `http://localhost:5001/auth/users/${userId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }

        const userData = await response.json();
        console.log(userData.name);
        setUser(userData.name);
      } catch (error) {
        // Handle error, e.g., display an error message
        console.error("Error fetching user:", error.message);
      }
    };

    fetchUserById();

    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    // Update localStorage with the new messages
    localStorage.setItem(
      "chatMessages",
      JSON.stringify([...messages, message])
    );

    // Cleanup the event listener when the component unmounts
    return () => {
      socket.off("message");
    };
  }, [userId]);

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", { message, room });

      setMessage("");
    }
  };

  return (
    <div>
      <div className="max-w-md mx-auto p-4 bg-gray-100 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Send a Message</h2>
        <div className="h-40 overflow-y-auto border p-2">
          {messages.map((msg, index) => (
            <div key={index}>
              {msg.userId === socket?.id ? (
                <>
                  <p className="text-right">{user}</p>
                  <p className="text-right">{msg.message}-{user}</p>
                </>
              ) : (
                <p className="text-left">{msg.message}</p>
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-col">
          <input
            className="w-full h-12 p-2 border rounded-md"
            placeholder="Enter the Room"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <button
            className="mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            onClick={joinRoom}
          >
            Join Room
          </button>
        </div>

        <textarea
          className="w-full h-32 p-2 border rounded-md"
          placeholder="Type your message..."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <button
          className="mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          onClick={handleSubmit}
        >
          Send
        </button>
      </div>
      
    </div>
  );
}

export default Chates;
