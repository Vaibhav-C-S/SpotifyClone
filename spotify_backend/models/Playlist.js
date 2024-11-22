const mongoose = require('mongoose')
const Playlist = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    thumbnail:{
        type: String,
        required:true,
    },
    owner: {
        type:mongoose.Types.ObjectId,
        ref:"User",
    },
    //1.playlist mein songs kaunse hein
    //2.playlist collaborators
    songs:[
        {
        type:mongoose.Types.ObjectId,
        ref:"Song",
        }
    ],
    collaborators:[
        {
            type:mongoose.Types.ObjectId,
            ref:"User",

        }
    ],
});
const PlaylistModel = mongoose.model("Playlist",Playlist);
module.exports = PlaylistModel;