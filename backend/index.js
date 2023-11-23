const express=require('express')
const mongoose=require('mongoose')
const cors = require('cors');
const authRoutes = require('./routes/auth');
require('dotenv').config()

const app=express()
const port=5001


mongoose.connect(process.env.MONGO_URL)

app.use(express.json())
app.use(cors());

// Routes
app.use('/auth', authRoutes);



app.listen(port,()=>{
    console.log(`server is running on port ${port}`)

})