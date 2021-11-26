var express = require('express');
var router = express.Router();
var createError = require('http-errors');
var fs = require('fs');
const productsJsonLocation = './data/products.json';

router.get('/', function (req, res, next) {
  fs.readFile(productsJsonLocation, (err, data) => {
    if (err) return next(createError(404, 'Not Found'));

    let productsJson = JSON.parse(data);
    let limit = req.query.limit || productsJson.length;
    if (limit > productsJson.length)
      limit = productsJson.length;

    res.json(productsJson.slice(0, limit));
  });
});

router.get('/:id', function(req, res, next) {
  fs.readFile(productsJsonLocation, (err, data) => {
    if (err) return next(createError(404, 'Not Found'));
    let productsJson = JSON.parse(data);
    const foundProduct = productsJson.find((data) => Number(data.id) === Number(req.params.id));

    if (!foundProduct) {
      return next(createError(404, 'Not Found'));
    }
    res.json(foundProduct);
  });
});

module.exports = router;
