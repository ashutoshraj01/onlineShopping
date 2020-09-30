const express = require('express');
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require("../Controllers/auth");
const { findUserById, viewUserProfile, updateUserProfile } = require("../Controllers/user");

router.get('/secret/:userId', requireSignin, isAuth, isAdmin, (req, res) =>{
        res.json({ user: req.profile})
});

router.get('/user/:userId', requireSignin, isAuth, viewUserProfile);
router.put('/user/:userId', requireSignin, isAuth, updateUserProfile);


router.param('userId',findUserById)

module.exports = router;