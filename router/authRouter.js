const express = require('express');
const router = express.Router();

const {signup,signIn,getData,logout} = require('../controller/authController');
const {authUser} = require('../middleware/authUser');

router.post("/signup",signup);
router.post("/signIn",signIn);
router.get("/getData",authUser,getData);
router.get("/logout",authUser,logout);

module.exports = router;