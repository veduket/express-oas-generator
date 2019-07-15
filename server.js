// Example of using the module

const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');
const generator = require('./index.js');

const app = express();
generator.init(app, {});

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({extended: true}));


const router = express.Router();
router.post('/', async(req, res, next) => {
  console.log(req.body);
  next();
});

const port = 3606
app.use('/books', router);
app.listen(port, function() {
  console.log('app listening on port: ' + port);
  setTimeout(() => {
    request({
      url: `http://localhost:${port}/books`,
      method: 'POST',
      headers: {'content-type' : 'application/json'},
      body: JSON.stringify({data: 'data'})
    });
  }, 2000);
});
