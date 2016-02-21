var express = require('express');
var app = express();

app.use(express.static('public'));

var items = require('./routes/items');

app.use('/api/items', items);

app.listen(3000, function(){
  console.log('Listening on port 3000...');
});
