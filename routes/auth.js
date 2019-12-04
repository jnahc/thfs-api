const express = require('express');
const router = express.Router();
const ctrl = require ('../controllers');

router.post('/register', ctrl.auth.register);
router.post('/login', ctrl.auth.login);
// router.get('/verify', ctrl.auth.verify);
// router.delete('/logout', ctrl.auth.logout);

module.exports = router;