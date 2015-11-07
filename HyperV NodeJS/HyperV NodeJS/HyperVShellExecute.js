var exec = require('child_process').exec;
function execute(command, callback){
    exec(command, function(error, stdout, stderr){ 
        if (error != null)
            callback(error.message+' '+stdout);
        else
            callback(stdout);
         });
};

module.exports.getAllVms = function(callback){
    execute("cscript //nologo ListAllVmAndStates.wsf", function(a) { 
        callback(a);
            });
}

module.exports.setvmstate = function(id, state, callback){
    execute("cscript //nologo RequestStateChangeVm.wsf \""+id+"\" "+state, function (a) {
        callback(a);
            });
}

module.exports.getVmExtraInfos = function(id, callback){
    execute("powershell .\\wmikvp.ps1 -Guid "+id, function(a) { 
        callback(a);
            });
}