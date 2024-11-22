const mongoose = require('mongoose')
const User = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:false,
    },
    email:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required :true,
    },
    likedSongs:{
        //change this array to later
        type:String,
        default:"",
    },
    likedPlaylists:{
        //change this array later
        type:String,
        default:"",
    },
    subscriedArtists:{
        type:String,
        default:"",
    },
    password:{
        type:String,
        required: true,
        
    }
});
const UserModel = mongoose.model("User",User);
module.exports = UserModel;