const express = require ('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get('/:id', ctrl.users.showCurrentUser),
router.put('/:id', ctrl.users.editCurrentUser),
router.get('/first/:id', ctrl.users.showUserFirstName),

module.exports = router;