const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get('/', ctrl.cast.showAllCast),
router.get('/:id', ctrl.cast.showOneCast),
router.post('/', ctrl.cast.createCast),

module.exports = router;