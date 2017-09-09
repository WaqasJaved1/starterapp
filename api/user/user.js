var express = require('express');
var router = express.Router();
var userController = require('./userController.js');

router.post('/', function(req, res) {
    userController.create(req, res);
});

router.get('/list', function(req, res) {
    userController.list(req, res);
});

router.get('/single:id', function(req, res) {
    userController.single(req, res);
});

router.delete('/:id', function(req, res) {
    userController.delete(req, res);
});

router.put('/:id', function(req, res) {
    userController.update(req, res);
});

module.exports = router;