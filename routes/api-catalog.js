/*============================================
; Title: api-catalog.js
; Author: Richard Krasso
; Date: 25 July 2020
; Modified By: Michelle Nesbitt
; Description: Demonstrates APIs
==============================================
*/
var express = require('express');
var router = express.Router();
var auth_controller = require('../controllers/authController');
router.post('/auth/register', auth_controller.user_register);
router.get('/auth/token', auth_controller.user_token);
module.exports = router;
