const express = require('express');
const router = express.Router();
const createError = require('http-errors');

router.get('/', (req, res, next) => {
  return next(createError(404, 'Not Found'));
});

module.exports = router;
