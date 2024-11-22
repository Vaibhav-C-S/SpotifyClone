const express = require("express")
const passport = require("passport")
const Playlist = require("../models/Playlist")
const User = require("../models/User")
const Song = require("../models/Song")
const router = express.Router()

//create a playlist

router.post("/create",passport.authenticate("jwt",{session:false}),
async (req,res) =>{
    const currentUser = req.user;
    const {
        name,
        thumbnail,
        songs
    } = req.body;

    if(!name||!thumbnail||!songs){
        return res.status(301).json({err:"Insufficent data"})
    }
    const playlistData = {name,thumbnail,songs,owner: currentUser.id,collaborators:[]}
    const playlist = await Playlist.create(playlistData)
    return res.status(200).json(playlist)
})
//this concept is req.params
router.get('/get/playlist/:playlistId',passport.authenticate("jwt",{session:false}),async (req,res) =>{
    const playlistId = req.params.playlistId;
    const playlist = await Playlist.findOne({_id:playlistId}).populate({
        path:"songs",
        populate:{
            path:"artist"
        }

})
    if(!playlist){
        return res.status(301).json({err:"Invalid Id"})
    }
    return res.status(200).json(playlist)

})
router.get("/get/me",passport.authenticate("jwt",{session:false}),async (req,res)=>{
    const user = req.user._id

    const playlists = await Playlist.find({owner:user}).populate("owner")
    if(!playlists){
        return res.status(304).json({err:"no such playlists"})
    }

    return res.status(200).json({data:playlists})
})


//get all playlists made by an artist
router.get("/get/artist/:artistId",passport.authenticate("jwt",{session:false}),async (req,res)=>{
    const artistId = req.params.artistId;
    const artist = await User.find({_id:artistId})
    if(!artist){
        return res.status(304).json({err:"invalid user"})
    }

    const playlists = await Playlist.find({owner:artistId})
    if(!playlists){
        return res.status(304).json({err:"no such playlists"})
    }

    return res.status(200).json({data:playlists})
})

router.post("/add/song",passport.authenticate("jwt",{session:false}),async (req,res)=>{
    const currentUser = req.user;
    const {playlistId,songId} = req.body;
    const playlist = await Playlist.findOne({_id:playlistId})
    if(!playlist){
        return res.status(304).json({err:"no such playlists"})
    }
    
    if(!playlist.owner.equals(currentUser._id) && !playlist.collaborators.includes(currentUser._id)){
        return res.status(400).json({err:"not allowed"})

    }
    
    const song = await Song.findOne({_id:songId})
    if(!song){
        return res.status(304).json({err:"song does not exists"})
    }
    playlist.songs.push(songId);
    await playlist.save();
    return res.status(200).json(playlist);
})


//add a song to a playlist
module.exports = router;