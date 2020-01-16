const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/fun', passport.authenticate('jwt', {session: false}), (req, res) => {
   return res.status(200).json({ success: true, data: 'Hello from api/example/fun' })
});

export default router;