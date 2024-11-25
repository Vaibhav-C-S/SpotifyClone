const express = require('express')
const mongoose = require('mongoose')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport')
const User = require('./models/User.js')
const authRoutes = require('./routes/auth.js')
const songRoutes = require('./routes/song.js')
const PlaylistRoutes = require("./routes/playlist.js")
const cors = require('cors')

require('dotenv').config();
const app = express()
const port = 8080
app.use(express.json());
app.use(cors())







mongoose.connect("mongodb://localhost:27017",
    {
        useNewUrlParser:true,
        useUnifiedTopology:true,
    
    })
    .then((x)=>{
        console.log("Connected to MongoDB")
    })
    .catch((err)=>{
        console.log(err)
        console.log("error while connecting to mongodb")
    })



const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;


let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY; // Ensure this is correctly fetched

passport.use(new JwtStrategy(opts, async (jwtPayload, done) => {
    try {
        const user = await User.findById(jwtPayload.identifier);  
        if (!user) {
            return done(null, false);
        }
        return done(null, user);
    } catch (err) {
        return done(err, false);
    }
}));





app.use("/auth",authRoutes)
app.use("/song",songRoutes)
app.use("/playlist",PlaylistRoutes)


app.get('/',(req,res)=>{
    res.send("hello world")
})
app.listen(port,()=>{
    console.log("listening on the port "+ port)
})
