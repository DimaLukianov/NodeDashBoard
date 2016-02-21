var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/dashboard');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected!")
});

var itemSchema = mongoose.Schema({
  title: String,
  description: String
});

var Item = mongoose.model('Item', itemSchema);

router.route('/')
  .get(function(req, res){
    Item.find({}, function(err, items) {
    if (err) return console.error(err);

    res.json(items);
  });
  })
  .post(parseUrlencoded, function(req, res){
    var item = new Item({
      title: req.body.title,
      description: req.body.description
    });
    if(item.title.length > 2 && item.description.length > 0){
      item.save(function (err, item) {
        if (err) return console.error(err);
        res.status(201).json(item);
      });
    }else{
      res.sendStatus(400);
    }
  });
router.route('/:id')
  .delete(function(req, res){
    Item.findByIdAndRemove(req.params.id, function(err) {
      if (err)throw err;

      res.sendStatus(200);
    });
  });

module.exports = router;
