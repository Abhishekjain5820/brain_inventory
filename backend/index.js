const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');



const app = express();
const server = require('http').Server(app);


const io = require('socket.io')(server, {cors: {origin: "*"}});

dotenv.config();
const port = process.env.PORT || 5001;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL);

// Middleware
app.use(cors());
app.use(express.json());



const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

// Start server
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Socket.IO
io.on('connection', (socket) => {
  console.log(`Socket ${socket.id} connected`);

  socket.on('sendMessage', (data) => {
    io.to(data.room).emit('message', data);
  });

  socket.on("join_room",(data)=>{
    socket.join(data)
  })

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
});