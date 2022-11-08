const express = require('express')
const bodyParser = require('body-parser')
const server = express()
const mongoose = require('mongoose')
const passport = require('passport')
const cors = require('cors')
const helmet = require('helmet')
const session = require('express-session')
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy
const User = require('./models/user.model.js')
require('dotenv').config();
const path = require('path')
//const {isAdmin} = require('middleware/auth.js')

//middleware
server.use(session({
    name: 'user-session',
    secret: 'finalCapstone',
    maxAge: 20 * 60 * 60 * 100
}))
server.use(helmet())
server.use(passport.initialize())
server.use(passport.session())
server.use(bodyParser.json())
server.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET, POST, PUT, DELETE',
    credentials: true
}))
server.use(express.static(path.join(__dirname,'frontend/build')));

//google passport login
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:8000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
        User.findOne({ googleId: profile.id }, function (err, user) {
            const googleUser={  
                'name': profile.displayName, 
                'id': user.id,
                'token': accessToken
            }
            console.log(googleUser)
             
            return cb(err, googleUser);
          });
  }
));

server.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

server.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: 'http://localhost:3000/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('http://localhost:3000/login?name='+req.user.name+'&id='+req.user.id+'&token='+req.user.token);
  });
passport.serializeUser((user, done)=>{
    return done(null,user)
})

passport.deserializeUser((user, done)=>{
    done(null,user)
})

//facebook passport login using the documentation from https://www.passportjs.org for facebook login. This is done the same as the google one above
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:8000/auth/facebook/callback"
},
function(accessToken, refreshToken, profile, cb) {
  User.findOne({ facebookId: profile.id }, function (err, user) {
    const facebookUser={  
      'name': profile.displayName, 
      'id': user.id,
      'token': accessToken
  }
  console.log(facebookUser)
  return cb(err, facebookUser);
  });
}
));

server.get('/auth/facebook', passport.authenticate('facebook', { scope: ['public_profile'] })); //authenticate facebook user

server.get('/auth/facebook/callback',passport.authenticate('facebook', { failureRedirect: 'http://localhost:3000/login' }),
function(req, res) {
  // Successful authentication, redirect home using params.
  res.redirect('http://localhost:3000/login?name='+req.user.name+'&id='+req.user.id+'&token='+req.user.token)
  
});
passport.serializeUser((user, done)=>{
  return done(null,user)
})
passport.deserializeUser((user, done)=>{
  done(null,user)
})

//routes
const user = require('./controllers/user.controller.js')
const event = require('./controllers/event.controller.js')

server.post('/signup', user.register)
server.post('/login', user.login)
server.post('/create',  event.create)
server.get('/displayAll', event.display)
server.delete('/delete/:id',  event.deleteOne)
server.put('/update/:id',  event.updateEvent)

server.use(require('./routes/user/Signup.js'))
server.use(require('./routes/user/Login.js'))
server.use(require('./routes/event/Create.js'))
server.use(require('./routes/event/EventDisplay.js'))
server.use(require('./routes/event/DeleteEvent.js'))
server.use(require('./routes/event/UpdateEvent.js'))


//connect to mongodb
const uri = process.env.URI
mongoose.connect(uri, {
    useNewUrlParser: true
})
mongoose.connection.on('error', function(){
    console.log('Connected to Mongo');
    console.log('Could not Connect');
    process.exit();
});
mongoose.connection.once('open', function(){
    console.log('Successfully connected')
})


if(process.env.NODE_ENV === 'production'){
  server.use(express.static(path.join(__dirname, 'frontend/build')));
  server.get('*', (req,res)=> {res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
});
}

const PORT = process.env.PORT||8000
server.listen(PORT, ()=>{console.log('Server running')})