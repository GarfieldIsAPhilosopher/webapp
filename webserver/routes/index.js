var express = require('express');
var router = express.Router();
var User = require('../model/user');
var passwordHash=require('password-hash');
var session = require('client-sessions');

var Title='garfield'
/* GET home page. */
router.get('/', function(req, res, next) {
var user=checkLoggedIn(req,res)
console.log("user", user)
  res.render('index', { title: 'express', logged_in_user:user });
});

router.get('/login', function(req,res,next){
  res.render('login', {title:'garfield'});

})

router.post('/login', function(req,res,next){

  var email=req.body.email;
  var password=req.body.password;
  User.find({email:email}, function(err, users){
    console.log(users)
    if (err) throw err;
    if(users.length==0){
      res.render('login',{
        title: Title,
        message: "user not found <a href='/register'>register</a>"
      });
    }else {
      var  user=users[0]
      if(passwordHash.verify(password, user.password)){
        console.log("correct")
        req.session.user=user.email;
        res.redirect('/');
      }else{
        console.log("incorrect")
        res.render('login', {
          title: Title,
        message: "password incorrect <a href='/register'>register</a>"
        })
      }

    
    }
  }
  
  );
});

router.get('/logout', function(req, res) {
    req.session.reset();
      res.redirect('/');
});


router.get('/register', function(req,res,next){
res.render('register')
})

router.post('/register', function(req,res,next){
  var email=req.body.email;
  var password=req.body.password;
var hashedPassword=passwordHash.generate(password);

  User.find({email:email}, function(err, users){
    if (err) throw err;
    if (users.length==0){
       var newUser=User({
         email:email,
         password:hashedPassword,
       });

       newUser.save(function(err){
         if(err) throw err;
         console.log('user created');
         req.session.user=email;
         res.redirect('/');
       })
    }else{
      console.log("User found for: " + email);
      res.render('register', {
        title: TITLE,
        message: 'Email is already used. Please pick a new one. Or <a href="/login">Login</a>'
      });

    }
  });
});

function checkLoggedIn(req, res){
if(req.session && req.session.user){
return req.session.user;
}
return null;
}

module.exports = router;
