/*============================================
; Title: authcontroller.js
; Author: Richard Krasso
; Date: 25 July 2020
; Modified By: Michelle Nesbitt
; Description: Demonstrates APIs
==============================================
*/
var User = require('../models/user');
/* NEW CODE 7/26*/
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');
 /*end new code 7/26*/

//OLD CODE
/*
 exports.user_register = function(req, res) {
 res.send('NOT IMPLEMENTED: User registration POST');
};
exports.user_token = function(req, res) {
 res.send('NOT IMPLEMENTED: User token lookup GET');
};
 */

//new code below this line 7/26 ****/
exports.user_register = function (req, res) {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);  
  
    var newUser = new User({ 
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email
    });
  
    User.add(newUser, (err, user) => {
      if (err)
        return res.status(500).send('There was a problem registering the user.');
  
      var token = jwt.sign({ id: user._id }, config.web.secret, {  
        expiresIn: 86400
      });
  
      res.status(200).send({ auth: true, token: token }); 
    });
  };
  
  exports.user_token = function (req, res) {
    console.log(req.userId)
      User.getById(req.userId, function (err, user) { 
        if (err)
          return res.status(500).send('There was a problem finding the user.'); 
        if (!user)
          return res.status(404).send('No user found.'); 
        res.status(200).send(user); 
      });
  }
  // END OF NEW CODE