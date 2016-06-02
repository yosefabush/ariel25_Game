var dataQuestion; 
var index;//index of question in dataQuestion
var flag;//interval stopper
var gameId=localStorage.PinCode; // for testing purposes (PIN GAME will be updated here)
// var gameId=1000;
var seconds = 0; //timing of answer (timestamp)
var timer; // hold the timer function
var user;
var userId = localStorage.generalId; // From registration
// userId = 9;

console.log('in gamejs: userId='+userId+" , gameId="+gameId);

// to hold the user's information from login screen (Constructor for USER)
function User(UserId, QuestionId, Answer, Time, IsCorrectAnswer) { 	
	this.UserId = UserId;
	this.QuestionId = QuestionId;
	this.Answer = Answer;
	this.Time = Time;
	this.IsCorrectAnswer = IsCorrectAnswer;
}

function LoadQuestion() {
    $("#question-area").empty(); 
    $("#input1").empty(); 
    $("#input2").empty(); 
    $("#input3").empty(); 
    $("#input4").empty(); 

    if (dataQuestion != undefined && dataQuestion.length > index) {
       var trHtml = "";
        trHtml = "<h>" + dataQuestion[index].Text+ "</h>";
        
        $("#question-area").append(trHtml);
		$("#input1").val(dataQuestion[index].Answer1);
		$("#input2").val(dataQuestion[index].Answer2);
		$("#input3").val(dataQuestion[index].Answer3);
		$("#input4").val(dataQuestion[index].Answer4); 
    }
       
    
}

function checkServer(){
    console.log('in checkServer');
	// Check with the server wheter to advance to the next question
     $.ajax("getGameInfo.php?req=getGameInfo&gameId=" + gameId).done(function(d) {
      var data = JSON.parse(d);
	  gameId = data[0].Id; 
	  if(data[0].Question != index)
       {
		   if(data[0].Status==0){ //game is active
               index = data[0].Question;               
               LoadQuestion();
               seconds = 0;
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
    
    var s = "setAnswer.php?req=setAnswer" + 
	  "&UserId=" + localStorage.generalId + 
	  "&QuestionId=" + dataQuestion[index].Id + 
	  "&Answer=" + answerUser + 
	  "&Time=" + seconds + 
	  "&IsCorrectAnswer=" + (dataQuestion[index].CorrectAnswer == answerUser);
    
    console.log(s);
    
	// updaing the database (insert and update)
	  var result = $.ajax(s).done(function(data) {
	  
	  
    }).fail(function(data) {
	
	//debug purposes
       console.error("fail");
    });
}

    
$(document).ready(function() {
    onLoading();
})   ;
        
function onLoading()
{
	//set timer
	timer = setInterval(setSeconds(), 200);
	
	//TODO: Need function here to load the information from the login screen
	user = new User(1, 1, 1, 0, false);
	
    /*
    $.ajax("getGameInfo.php?req=getUser&userId=" + userId).done(function(data) {
        user = $.parseJSON(data);
        console.log(user);
        
            //alert("good:" + data);
    }).fail(function(data) {
            console.error("fail:" + data);
    }).always(function(data) {
            console.log("always:" + data);
    });
     */
    
    
	// Populate the page with questions
    $.ajax("getQuestions.php?req=getQuestions&gameId=" + gameId).done(function(data) {
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
	seconds += 1;
}

setInterval(checkServer, 5000);