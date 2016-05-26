var dataQuestion; 
var index;//index of question in dataQuestion
var flag;//interval stopper
var gameId=1; // for testing purposes (PIN GAME will be updated here)
var seconds = 0;


function LoadQuestion() {
    $("question-area").empty(); 
	$("input1").empty(); 
	$("input2").empty(); 
	$("input3").empty(); 
	$("input4").empty(); 
    
       var trHtml = "";
        trHtml = "<h>" + data[index].Text+ "</h>";
        
    $("#question-area").append(trHtml);
		$("#input1").val(dataQuestion[index].Answer1);
		$("#input2").val(dataQuestion[index].Answer2);
		$("#input3").val(dataQuestion[index].Answer3);
		$("#input4").val(dataQuestion[index].Answer4);
		
    flag=setInterval(checkServer(), 5000);
}

function checkServer(){

	// Check with the server wheter to advance to the next question
     dataQuestion = $.ajax("getGameInfo.php?req=getGameInfo&gameId=" + gameId).done(function(data) {
	  gameId = data.GameId; 
	  if(data!=dataQuestion[index].Id)
       {
		   flag=null;
		   if(data.Status==0){
		   index++;
		   LoadQuestion();
			}
		   else
		   window.location("winner.html");
		}
    }).fail(function(data) {
            alert("fail:" + data);
    }).always(function(data) {
            alert("always:" + data);
    });
}

function setAnswer(answerUser) {

		// updaing the database (inserting and 
	  var result = $.ajax("setAnswer.php?req=setAnswer&gameId=" + gameId).done(function(data) {
	  /*
	  * UserId
	  * QuestionId
	  * Answer
	  * Time
	  * IsCorrectAnswer
	  */
    }).fail(function(data) {
            
    });
}

    
$(document).ready(function() {
    onLoading();
})   ;
        
function onLoading()
{
   dataQuestion = $.ajax("getQuestions.php?req=getQuestions&gameId=" + gameId).done(function(data) {
            alert("good:" + data);
    }).fail(function(data) {
            alert("fail:" + data);
    }).always(function(data) {
            alert("always:" + data);
    });
     
	 // TODO: function to get the initial value of gameId


      index=dataQuestion[0];  

    LoadQuestion();    

}