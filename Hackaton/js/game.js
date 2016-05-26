var dataQuestion; 
var index;//index of question in dataQuestion
var flag;//interval stopper
var gameId=1; // for testing purposes (PIN GAME will be updated here)
var seconds = 0.00; //timing of answer (timestamp)
var timer; // hold the timer function
var user;


// to hold the user's information from login screen (Constructor for USER)
function User(UserId, QuestionId, Answer, Time, IsCorrectAnswer) { 	
	this.UserId = UserId;
	this.QuestionId = QuestionId;
	this.Answer = Answer;
	this.Time = Time;
	this.IsCorrectAnswer = IsCorrectAnswer;
}

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
		   if(data.Status==0){ //game is active
		   index++;
		   timer = null;
		   LoadQuestion();
			}
		   else // need to check if won or not
		   window.location("winner.html");
		}
    }).fail(function(data) {
            alert("fail:" + data);
    }).always(function(data) {
            alert("always:" + data);
    });
}

function setAnswer(answerUser) {

	// updaing the database (insert and update)
	  var result = $.ajax("setAnswer.php?req=setAnswer" + 
	  "&UserId=" + user.UserId + 
	  "&QuestionId=" + user.QuestionId + 
	  "&Answer=" + user.Answer + 
	  "&Time=" + user.Time + 
	  "&IsCorrectAnswer=" + user.IsCorrectAnswer).done(function(data) {
	  
	  
    }).fail(function(data) {
	
	//debug purposes
       alert("fail");
    });
}

    
$(document).ready(function() {
    onLoading();
})   ;
        
function onLoading()
{
	//set timer
	timer = setInterval(setSeconds(), 100);
	
	//TODO: Need function here to load the information from the login screen
	user = new User(1, 1, 1, 0, false);
	
	// Populate the page with questions
   dataQuestion = $.ajax("getQuestions.php?req=getQuestions&gameId=" + gameId).done(function(data) {
            alert("good:" + data);
    }).fail(function(data) {
            alert("fail:" + data);
    }).always(function(data) {
            alert("always:" + data);
    });
     
	 // TODO: function to get the initial value of gameId
	
	
    index=0;  

    LoadQuestion();
}

// timer functions
function setSeconds(){
	seconds += 0.01;
}