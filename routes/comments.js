const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get("/:commentId", ctrl.comments.showOneComment),
router.post("/:userId/:castId", ctrl.comments.createComment),
router.put('/:commentId', ctrl.comments.updateComment),
router.delete('/:userId/:castId/:commentId', ctrl.comments.destroy),
router.get('/cast/:castId', ctrl.comments.castComments),
router.get('/',
ctrl.comments.showAllComments),

module.exports = router;