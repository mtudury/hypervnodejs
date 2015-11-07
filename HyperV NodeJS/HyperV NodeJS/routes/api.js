var hyperv = require("../HyperVShellExecute");
/*
 * GET home page.
 */

exports.getvms = function(req, res){
  hyperv.getAllVms(function (json) { 
      res.setHeader('content-type', 'application/json');
      res.send('{"aaData": '+json+'}'); });
};

exports.setvmstate = function(req, res) {
    var id = req.query.id;
    var state = req.query.state;

    hyperv.setvmstate(id, state, function (restxt) { 
        res.send(restxt); });
}

exports.getvmextrainfos = function(req, res) {
    var id = req.query.id;
    var state = req.query.state;

    hyperv.getVmExtraInfos(id, function (restxt) { 
        res.setHeader('content-type', 'application/json');
        res.send(restxt); });
}




