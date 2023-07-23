const express = require('express');
const router = express.Router();

const {signup,signIn} = require('../controller/authController');

router.post("/signup",signup);
router.post("/signIn",signIn);

module.exports = router;