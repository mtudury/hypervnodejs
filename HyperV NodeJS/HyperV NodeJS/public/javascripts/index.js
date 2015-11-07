
$(document).ready(function() {
    DrawTable();
});

function DrawTable()
{
    $("#dtable").dataTable( {
        "bProcessing": true,
        "iDisplayLength": 50,
        "sAjaxSource": "/api/getvms",
        "aoColumns": [
            { "mData": "DisplayName" },
            { "mData": "StateText" },
            { "mData": "HealthStateText" }
        ],
       "aoColumnDefs": [
	    { "aTargets": [3], "mData": null, "mRender": RenderIP },
            { "aTargets": [4], "mData": null, "mRender": RenderActions } ]
    } );
}

function RefreshTable()
{
    $("#dtable").dataTable().fnReloadAjax();//DrawTable();
}

function RenderIP(data, type, full) {
    var html = '';
    if (full.State == 2)
    {
	html = "<span id=\"ip-" + full.Name + "\"></span>";
        $.getJSON('/api/getvmextrainfos?id='+full.Name, null, function (obj) { if (obj.NetworkAddressIPv4 != null) $("#ip-" + full.Name).html(obj.NetworkAddressIPv4); });
    }    
    return html;
}

function RenderActions(data, type, full) {
    var Actions = AvailStates(full.State);
    var html = '';

    var action = Actions.pop();
    while (action != null) {
        html += '<button onclick="vmchange(\''+ full.Name +'\', ' + action.State + ');">'+action.StateText+'</button>';
        action = Actions.pop();
    }

    return html;
}

function AvailStates(curstate) {
    var availstates = new Array();
    if (curstate == 2)
    {
        availstates.push({ State: 3, StateText: "Stop"});
        availstates.push({ State: 10, StateText: "Reboot"});
        availstates.push({ State: 32768, StateText: "Pause"});
        availstates.push({ State: 32769, StateText: "Suspend"});
    }
    if ((curstate == 3)||(curstate == 32768)||(curstate == 32769)||(curstate == 6))
    {
        availstates.push({ State: 2, StateText: "Start"});
    }
    return availstates;
}

function vmchange(name, state) {
    $.get('/api/setvmstate?id='+name+'&state='+state, null, function (msg) { alert(msg); setTimeout(RefreshTable, 1000); });
}