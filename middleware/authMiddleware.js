const jwt = require("jsonwebtoken");
const User = require("../models/User");

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, "course secret key that will be used to sign the token", (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect("/login");
            } else {
                console.log(decodedToken);
                next();
            }
        });
    } else {
        res.redirect("/login");
    }
}

//Check if the user has a valid email and password with an email extension of @teacherviewer.com
const allowedEmails = [
    'teacherone@teacherviewer.com',
    'teachertwo@teacherviewer.com',
    'teacherthree@teacherviewer.com',
    'teacherfour@teacherviewer.com',
    'teacherfive@teacherviewer.com'
  ];
  
const requireAllowedEmail = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, "course secret key that will be used to sign the token", async (err, decodedToken) => {
        if (err) {
          console.log(err.message);
          res.redirect('/login');
        } else {
          let user = await User.findById(decodedToken.id);
          // Check if user email is in allowedEmails array
          if (allowedEmails.includes(user.email)) {
            next();
          } else {
            res.redirect('/unauthorized');
          }
        }
      });
    } else {
      res.redirect('/unauthorized');
    }
  }
  


// Check current user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, "course secret key that will be used to sign the token", async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            } else {
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    } 
    else {
        res.locals.user = null;
        next();
    }
}


module.exports = {requireAuth, checkUser
, requireAllowedEmail, allowedEmails};