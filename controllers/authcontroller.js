var path = require("path");
var exports = module.exports = {}

exports.signin = function(req,res){

	res.sendFile(path.join(__dirname, "../public/login.html"));

}

exports.home = function(req, res){
  res.sendFile(path.join(__dirname, "../public/test.html"));

}
exports.history = function(req, res){
  res.sendFile(path.join(__dirname, "../public/history.html"));
  
}
exports.logout = function(req,res){

  req.session.destroy(function(err) {
  res.redirect('/signin');
  });

}