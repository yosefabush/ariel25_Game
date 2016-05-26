var gameId = 1000;
var gameData;

// dom html pointers
var gameName;
var gamePin;
var newUsersList;
var totalUsers;

function onInit() {
    gameName = $('#gameName');
    newUsersList = $('#newUsersList');
    gamePin = $('#gamePin');
    totalUsers = $('#totalUsers');
    
    loadFromServer();
    
    // call loop every 5 seconds
    setInterval(loop, 5000);
    
    $("#startGame").click(function() {
       window.location.replace('page1/HtmlPage.html'); 
    });
}

function loop( )
{
    loadFromServer();
}

function loadFromServer () {
    // LOAD DATA
    $.get( "getQuestions.php?req=getWaitingScreenData&gameId=" + gameId, function( data ) {
       gameData = $.parseJSON(data);
       console.log('gameData:' + gameData);
       show();
    });
}

function show() {
    gameName.text(gameData.game.Title);
    gamePin.text(gameData.game.Id);
    totalUsers.text(gameData.totalUsers);
    
    newUsersList.empty();    
    $.each(gameData.newUsers, function(i, item) {
        var liHTML = '';
        liHTML += '<li>' + item.NickName + '</li>';
        newUsersList.append(liHTML);
    });        
}

$(document).ready(onInit);