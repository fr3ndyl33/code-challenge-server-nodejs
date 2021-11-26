var express = require('express');
var router = express.Router();
var createError = require('http-errors');

router.get('/', (req, res, next) => {
  return next(createError(404, 'Not Found'));
});

module.exports = router;
