var i=0;
var arr=[];

var gameId = localStorage.gameId;

//setInterval(checkServer(), 1000);

function onInit() {

     $.ajax({
        type: "POST",
        data: { "gameId": gameId },
        url: "./setStatus.php" ,
        success : function(data) {

        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });

    // LOAD ALL QUESTIONS
    $.get( "../getQuestions.php?req=getQuestions&gameId=" + gameId, function( data ) {
       arr = $.parseJSON(data);
       console.log('arr:' + arr);
       showCurrentQuestion();
        
        
    });     
}

function showCurrentQuestion() {
    if(i>=arr.length-1){
        $('#nextButton').val("finish");
      }
      
        $('#q').text(arr[i].Text);
        $("#a1").text(arr[i].Answer1);
        $("#a2").text(arr[i].Answer2);
        $("#a3").text(arr[i].Answer3);
        $("#a4").text(arr[i].Answer4); 
    
}

$("#nextButton").click(function(){
     if($("#nextButton").val() == "Next"){
        loadNextQuestion();
     }else{
         finishGame();
     }

});
function loadNextQuestion() {
    i++;
    showCurrentQuestion();
    
    $.get( "../getQuestions.php?req=setGameQuestion&gameId=" + gameId + "&questionId=" + i, function( data ) {
        if (data == "1") // ok
            console.log("call to setGameQuestion OK");
        else
            console.log("call to setGameQuestion ERROR");
    });
    
}

function finishGame(){
    $.ajax({
        type: "POST",
        data: { "gameId": gameId },
        url: "finishGame.php" ,
        success : function(data) {
            
		      window.location ="../winnerAdmin.html";

        },
        error: function (xhr, ajaxOptions, thrownError) {
           alert(thrownError);

        }
    });
}


$(document).ready(onInit);