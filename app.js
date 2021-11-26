const express = require('express');
const cors = require('cors');
const indexRouter = require('./routes/index');
const productRouter = require('./routes/product');
const temperatureRouter = require('./routes/temperature');

const app = express();
const port = 8081;

app.use(cors());
app.use(express.json());
app.listen(port, () => {
    console.log(`SensorTech server at http://localhost:${port}`);
});
app.use('/', indexRouter);
app.use('/product', productRouter);
app.use('/temperature', temperatureRouter);

module.exports = app;
