require('dotenv').config();
require('./config/passport')
const express = require('express'),
      app = express(),
      mongoose = require('mongoose'),
      passport = require('passport'),
      session = require('express-session'),
      mongoStore = require('connect-mongo'),
      cors = require('cors')
const  port = process.env.PORT,
      { isEditor, isUser } = require('./routes/AuthMiddelware'),
      user = require('./routes/user')
const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}  
const conn = process.env.DB_ONLINE
const key = process.env.SECRET    
mongoose.connect(conn, dbOptions).catch((error)=>{
    console.log(error)
})
const sessionOptions = {
    secret: key,
        resave: false,
        saveUninitialized: true,
        store: mongoStore.create({
            mongoUrl: conn,
            collectionName: 'session',
            autoRemove: 'native'
        }),
        name: 'user',
        cookie: {
            secure: process.env.SECURECOOKIE === 'true' ? true : false,
            maxAge: 1000 * 60 * 60* 24
        }
}
const corsOptions = {
    origin: function(origin, callback){
        if(!origin) return callback(null, true);
        return callback(null, true);
      },
    optionSuccesStatus: 200,
    credentials: true
  }

app.set('trust proxy', 1);
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(session(sessionOptions))
app.use(passport.initialize())
app.use(passport.session())
app.use(passport.authenticate('session'))
app.use('/api/user', user)

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})