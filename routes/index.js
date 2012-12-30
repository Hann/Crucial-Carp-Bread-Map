
/*
 * GET home page.
 */

var databaseObject = require('../database');
var db = databaseObject.db();
exports.index = function(req, res){
    db.emit('find');
    res.render('index', { title: '붕어빵 지도' });
};

exports.register = function(req, res){
  res.render('register', { title: '등록하기'});
};

exports.registerPost = function(req, res){
  var info = {
    name : req.body.name,
    place : req.body.place,
    lat : req.body.lat,
    lng : req.body.lng,
    comment : [],
    like : 0,
    unlike : 0
  };
  db.emit('insert', info);
    // hmm...
  res.redirect('http://bread.hannjs.com/');
};