var databaseObject = require('../database');
var db = databaseObject.db();

// insert comment.
exports.comment = function(req, res){
    db.emit('comment', {
        'id' : req.params.id,
        'comment' : req.body.comment,
        'password' : req.body.password,
        'datetime' : new Date().toJSON()
    });

    res.end( JSON.stringify({'error' : 0 }));
};

// find comments by object id.
exports.retrieve = function(req, res){
    db.emit('retrieveComments', {
        'id' : req.params.id
    }, function(array) {
        // mareker don't recommend that '_id'  string.
        array[0]._id = array[0]._id.toString();

        if ( array.length === 0 ){
            res.end( JSON.stringify( { 'error' : -1 }));
        }
        else {
            res.end( JSON.stringify( { 'id' : array[0]._id, 'name' : array[0].name, 'place' : array[0].place, 'comment' : array[0].comment, 'error' : 0 }));
        }
    });
};

exports.coordinates = function(req, res) {
    db.emit('coordinates',function(array){
        var output = [];
        for (var i = 0 ; i < array.length; i++ ){
            array[i]._id = array[i]._id.toString();
            output.push(array[i]);
        }
        res.end( JSON.stringify({ 'data'  : output , 'error' : 0}));
    });
};