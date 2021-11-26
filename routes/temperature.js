var express = require('express');
var fetch = require('node-fetch');
var router = express.Router();
var createError = require('http-errors');
const config = require('../config');
var fs = require('fs');
const productsJsonLocation = './data/products.json';

router.get('/', function(req, res, next) {
  fs.readFile(productsJsonLocation, async function(err, data) {
    if (err) return next(createError(404, 'Not Found'));

    let productsJson = JSON.parse(data);
    let limit = req.query.limit || productsJson.length;
    if (limit > productsJson.length)
      limit = productsJson.length;

    const sendJson = [];
    let promises = [];
    for(let i = 0; i < limit; i++) {
      const product = productsJson[i];
      promises.push(
          fetch(`${config.temperature_sensor_api_url}/${product.id}`)
              .then(response => response.json())
              .then(response => {
                sendJson.push({
                  ...product,
                  ...response
                })
              })
      )
    }
    await Promise.all(promises).then(() => res.json(sendJson)).catch(() => console.log('something wrong temperature.js Route /'));
  });
});

router.get('/:id', function(req, res, next) {
  fs.readFile(productsJsonLocation, function(err, data) {
    if (err) return next(createError(404, 'Not Found'));
    let productsJson = JSON.parse(data);
    const foundProduct = productsJson.find((data) => Number(data.id) === Number(req.params.id));

    if (!foundProduct) {
      return next(createError(404, 'Not Found'));
    }

    fetch(
        `${config.temperature_sensor_api_url}/${req.params.id}`
    )
        .then(response => response.json())
        .then(response => {
          res.send({
            ...foundProduct,
            ...response
          })
        })
  });
});

module.exports = router;
