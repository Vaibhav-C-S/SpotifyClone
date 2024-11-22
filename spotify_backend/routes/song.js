const express = require('express');
const passport = require('passport');
const jwt = require("jsonwebtoken")
const Song = require('../models/Song');
const User = require('../models/User')
const router = express.Router(); // Use express.Router() for consistency

// POST route to create a new song
router.post("/create", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const { name, thumbnail, track } = req.body;

    // Check if required fields are present
    if (!name || !thumbnail || !track) {
        return res
            .status(400) // Changed status code to 400 for bad request
            .json({ error: "Insufficient details to create a song" });
    }

    try {
        const artist = req.user._id; // Extract artist from the authenticated user
        const songDetails = { name, thumbnail, track, artist };
        
        // Create and save the song to the database
        const createdSong = await Song.create(songDetails);
        return res.status(200).json(createdSong);
    } catch (error) {
        console.error("Error creating song:", error);
        return res.status(500).json({ error: "An error occurred while creating the song" });
    }
});

// GET route to fetch songs published by the current user
router.get("/get/mysongs", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const currentUser = req.user;
        
        // Find all songs where the artist's ID matches the current user's ID
        const songs = await Song.find({ artist: currentUser._id }).populate("artist");
        
        return res.status(200).json({ data: songs });
    } catch (error) {
        console.error("Error fetching songs:", error);
        return res.status(500).json({ error: "An error occurred while fetching the songs" });
    }
});

//get route to get all songs by a specific artiest
router.get("/get/artist/:artistId",passport.authenticate("jwt",{session:false}),
async (req,res)=>{
    const {artistId} = req.params;
    const artist = await User.findOne({_id:artistId})
    if(!artist){
        return res.status(301).json({err:" Artist does not exist"})
    }
    const songs = await Song.find({artist:artistId});
    return res.status(200).json({data:songs})
})




//get route to get a single song by name
router.get("/get/songname/:songName",passport.authenticate("jwt",{session:false}),
async (req,res)=>{
    const {songName} = req.params;
    const songs = await Song.find({
        name: { $regex: String(songName), $options: 'i' } 
    }).populate("artist");
    return res.status(200).json({data:songs});
})





module.exports = router;
