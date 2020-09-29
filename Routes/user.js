const express = require('express');
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require("../Controllers/auth");
const { findUserById, read, update } = require("../Controllers/user");

router.get('/secret/:userId', requireSignin, isAuth, isAdmin, (req, res) =>{
        res.json({ user: req.profile})
});

router.get('/user/:userId', requireSignin, isAuth, read);
router.put('/user/:userId', requireSignin, isAuth, update);


router.param('userId',findUserById)

module.exports = router;