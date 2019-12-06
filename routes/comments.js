const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get("/:commentId", ctrl.comments.showOneComment),
router.post("/:userId/:castId", ctrl.comments.createComment),
router.put('/:commentId', ctrl.comments.updateComment),
router.delete('/:commentId', ctrl.comments.destroy),

module.exports = router;