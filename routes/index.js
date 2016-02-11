//Homepage
exports.index = function(req, res) {
  res.render('index', {title: 'Bienvenido!'});
};

//User list
exports.userlist = function(db) {
  return function(req, res) {
    var collection = db.get('users');
    collection.find({},{},function(e, docs) {
      res.render('userlist', {
        "userlist" : docs,
        title : "User List"
      });
    });
  };
};
