var databaseObject = require('../database');
var db = databaseObject.db();

// insert comment.
exports.comment = function(req, res){
    db.emit('comment', {
        'id' : res.body.id,
        'comment' : res.body.comment,
        'password' : res.body.password
    });

    res.end( JSON.stringify({'error' : 0 }));
};

// find comments by object id.
exports.retrieve = function(req, res){
    db.emit('retrieveComments', {
        'id' : res.body.id
    });
};

exports.coordinates = function(req, res) {
    db.emit('coordinates',function(array){
	res.end( JSON.stringify({ 'data'  : array , 'error' : 0}));
    });
};