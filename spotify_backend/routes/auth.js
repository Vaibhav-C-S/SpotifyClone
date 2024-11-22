const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');  // Ensure you require bcrypt for password hashing
const User = require("../models/User.js");
const { getToken } = require('../utils/helpers.js');

// Register a user
router.post("/register", async (req, res) => {
   
        const {
            email,
            password,
            firstName,
            lastName,
            username
        } = req.body;

        // Step 2: Check if the user with the given email already exists
        const user = await User.findOne({ email: email });  // Await the result

        if (user) {
            return res.status(403).json({ error: "User already exists!!" });
        }

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword)  
        const newUserData = { email, password: hashedPassword, firstName, lastName, username };

        // Create a new user
        const newUser = await User.create(newUserData);

        // Create a token for the new user
        const token = await getToken(email, newUser);
        console.log(token)
        // Prepare user data to return (excluding password)
        const userToReturn = { ...newUser.toJSON(), token };
        delete userToReturn.password;

        // Return the response with the new user data and token
        return res.status(200).json(userToReturn);

    
})

router.post("/login",async (req,res)=>{
    const {email,password} = req.body;
    const user = await User.findOne({email:email}).select('+password')
    console.log(user)
    console.log(email,password)
    if(!user){
        return res.status(403).json({err:"Invalid creds"})
    }
    console.log(user.password)
    const validatepassword = await bcrypt.compare(password,user.password)
    console.log(validatepassword)
    if(!validatepassword){
        return res.status(403).json({err:"Invalid creds"})
    }
    const token = await getToken(email, user);

    // Prepare user data to return (excluding password)
    const userToReturn = { ...user.toJSON(), token };
    delete userToReturn.password;

    // Return the response with the new user data and token
    return res.status(200).json(userToReturn);
})

module.exports = router;
