var dataQuestion; 
var index;//index of question in dataQuestion
//var flag;//interval stopper
var gameId = 1000; // for testing purposes (PIN GAME will be updated here)
//var seconds = 0; //timing of answer (timestamp)
//var timer; // hold the timer function
//var user;
var userId = 9;

/* to hold the user's information from login screen (Constructor for USER)
function User(UserId, QuestionId, Answer, Time, IsCorrectAnswer) 
{ 	
	this.UserId = UserId;
	this.QuestionId = QuestionId;
	this.Answer = Answer;
	this.Time = Time;
	this.IsCorrectAnswer = IsCorrectAnswer;
}
*/

function LoadQuestion() {

	// empty current question
    $("#question-area").empty(); 
	$("#input1").empty(); 
	$("#input2").empty(); 
	$("#input3").empty(); 
	$("#input4").empty(); 
    
   var tableRowHtml = "";
   tableRowHtml = "<h1>" + dataQuestion[index].Text + "</h1>";
        
    $("#question-area").append(trHtml);
	$("#input1").val(dataQuestion[index].Answer1);
	$("#input2").val(dataQuestion[index].Answer2);
	$("#input3").val(dataQuestion[index].Answer3);
	$("#input4").val(dataQuestion[index].Answer4);
		
    // flag=setInterval(checkServer(), 5000);
}

function checkServer(){

	// Check with the server whether to advance to the next question
     dataQuestion = $.ajax("getGameInfo.php?req=getGameInfo&gameId=" + gameId).done(function(data) {
	 gameId = data.GameId; 
	 if(data!=dataQuestion[index].Id)
       {
		   flag=null;
		   if(data.Status==0){ //game is active
		   index++;
		   //timer = null;
		   LoadQuestion();
			}
		   else // need to check if won or not
		   window.location("winner.html");
		}
    }).fail(function(data) {
            console.error("fail:" + data);
    }).always(function(data) {
            console.log("always:" + data);
    });
}


function setAnswer(answerUser) {
    // user.Id;
    // dataQuestion[index].Id;
    // answerUser
    // time
    // dataQuestion[index].CorrectAnswer == answerUser
    
    var s = 
	  "setAnswer.php?req=setAnswer" + 
	  "&UserId=" + user.Id + 
	  "&QuestionId=" + dataQuestion[index].Id + 
	  "&Answer=" + answerUser + 
	  "&Time=" + seconds + 
	  "&IsCorrectAnswer=" + (dataQuestion[index].CorrectAnswer == answerUser);
    
    console.log(s);
    
	// updaing the database (insert and update)
	  var result = $.ajax(s).done(function(data) 
	  {
	  
	  
      }).fail(function(data) {
	
		//debug purposes
         console.error("fail");
      });
}

    
$(document).ready(function() {
    startGame();
})   ;
        
function startGame()
{
	//set timer
	//timer = setInterval(setSeconds(), 100);
	
	//load the information from the login screen about the user
    $.ajax("getGameInfo.php?req=getUser&userId=" + userId).done(function(data) 
	{
        user = $.parseJSON(data);
        console.log(user);
            //alert("good:" + data);
    }).fail(function(data) {
            console.error("fail:" + data);
    }).always(function(data) {
            console.log("always:" + data);
    });
     
    
    
	// Populate the page with questions
    $.ajax("getQuestions.php?req=getQuestions&gameId=" + gameId).done(function(data) 
	{
            index=0;  
            dataQuestion = $.parseJSON(data);
			LoadQuestion();
            console.log("good:" + data);
    }).fail(function(data) {
            console.error("fail:" + data);
    }).always(function(data) {
            console.log("always:" + data);
    });
     
	 // TODO: function to get the initial value of gameId
	
	
    
}

// timer functions
function setSeconds(){
	seconds += 0.01;
}