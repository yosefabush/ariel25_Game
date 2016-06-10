 //var gameId = localStorage.PinCode;
 //var userId = localStorage.generalId;
 var gameId = 1000;
 var userId = 46;
 var winner;


$(document).ready(function(){
	// Populate the page with questions
    $.ajax("getWinner.php?req=getWinner&gameId=" + gameId).done(function(data) {   
    winner = $.parseJSON(data);
    
    // after getting the winner update the targeted html    
    $("#winner-area").text("המנצח:" + winner[0].FirstName + " " + winner[0].LastName + " כינוי:" + winner[0].NickName);
    $("#winner-points-area").text("ניקוד: " + winner[0].Score);    
    console.log("good:" + data);
    }).fail(function(data) {
            console.error("fail:" + data);
    }).always(function(data) {
            console.log("always:" + data);
    });
});
