const express = require('express');
const router = express.Router();

const { requireSignin } = require("../Controllers/auth");
const { findUserById } = require("../Controllers/user");

router.get('/secret/:userId', requireSignin, (req, res) =>{
        res.json({ user: req.profile})
});
router.param('userId',findUserById)

module.exports = router;