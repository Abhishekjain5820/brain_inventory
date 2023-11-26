const User = require('../models/User');
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken')
 const registerController = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    //if user already exists then no need to register again
    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    //if user not exist in the database then hash the password and store in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ name, password: hashedPassword, email, phone });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully",newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

 const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if the username already exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // if user exist then password entered is correct or not
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.json({ token,user:{name:user.name,id:user._id} });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllUsersController=async(req,res)=>{
    try {
        const users=await User.find({})
        res.json({ users });

    } catch (error) {
        console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
        
    }

}
const getUsersController=async(req,res)=>{
  try {
    const userId = req.params.userId;

    // Fetch the user from MongoDB based on the provided ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { registerController, loginController,getAllUsersController ,getUsersController};
