const express = require('express'),
      router = express.Router(),
      User = require('../config/userSchema'),
      passport = require('passport'),
      bcrypt = require('bcrypt'),
      {isUser, isEditor } = require('../routes/AuthMiddelware')

// regex for å validere e-post adresse
// hentet fra https://emailregex.com/
const mailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<;>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const isEmail = (email)=> {return email.match(mailRegex)}
//registrerer bruker
router.route('/signup')
    .post(async (req, res, next) => {
        if(isEmail(req.body.email.toLowerCase())){
            //lagrer data i userSchema objekt
            const nyBruker = new User({
                email: req.body.email.toLowerCase(),
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                password: req.body.password,
            })
            //lagrer i db
            await nyBruker.save((err, doc)=>{
                if(err)return res.json("E-post allerede i bruk")
               
                //logger krever at route sender med info
                res.locals.level = 'info'
                res.locals.email = req.body.email
                res.locals.message = `Bruker ble registrert ${doc}`

                req.login(nyBruker, function(err) {
                if (err) { return next(err); }
                    res.redirect('/');
                    next()
                });
            })
        } else{
            res.json("Ugyldig Email")
        }
    })

router.route('/')
//sender brukerdata når de er logget inn
    .get((req, res, next)=>{
        if(req.session.passport===undefined){
            res.json({loginStatus:false});
        } else {
            res.json({
                loginStatus:true,
                user: req.session.passport.user
            })
        }
    })
    //login som bruker localstrategy fra passport
    .post(passport.authenticate('local'), (req, res, next) => {
        res.json({
            loginStatus:true,
            user:req.session.passport.user
        })
        next()
    })
    // endre på bruker sitt fornavn og etternavn
    .put(isUser, async (req, res, next) => {

           
    })
    // slett bruker
    .delete(isUser, async (req, res, next) => {

    })
    // logge ut.
    router.route('/logout')
    .get(isUser, (req,res,next)=>{
        req.logout();
        req.session.destroy();
        res.clearCookie('connect.sid', {path: '/'}).status(200).send('Ok.');
        next()
    })
    router.route('/newpassword')
        .put(isUser, async (req, res, next)=>{
          
        })
    router.route('/all')
            .get(isEditor, async (req, res, next)=>{
                
            })
            .put(isUser, async (req, res, next) => {
              
            })

module.exports = router;