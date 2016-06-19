var dataQuestion; 
var index = -1;//index of question in dataQuestion
var flag;//interval stopper
var gameId=localStorage.PinCode; // for testing purposes (PIN GAME will be updated here)
// var gameId=1000;
var seconds = 0; //timing of answer (timestamp)
var timer; // hold the timer function
var scoreTimer;
var user;
var gameTitle;
var userId = localStorage.generalId; // From registration

// userId = 9;

console.log('in gamejs: userId='+userId+" , gameId="+gameId);
console.log('in gamejs: gameTitle='+gameTitle+" , gameId="+gameId);

/* to hold the user's information from login screen (Constructor for USER)
function User(UserId, QuestionId, Answer, Time, IsCorrectAnswer) { 	
	this.UserId = UserId;
	this.QuestionId = QuestionId;
	this.Answer = Answer;
	this.Time = Time;
	this.IsCorrectAnswer = IsCorrectAnswer;
}
*/

function LoadQuestion() {
    //Empty question text
    $("#question-area").empty(); 
    $("#input1").empty(); 
    $("#input2").empty(); 
    $("#input3").empty(); 
    $("#input4").empty(); 
    
    // repopulate it with the new question
    if (dataQuestion != undefined && dataQuestion.length > index) {
       var trHtml = "";
        trHtml = "<h3>" + dataQuestion[index].Text+ "</h3>";
        
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
          gameTitle = data[0].Title;
          $("#topTxt").html(gameTitle);
	  if(data[0].Question != index){
	      if(data[0].Status==1){ //game is active
	        scoreTimer = setInterval(function(){
        		seconds += 0.2;
        		console.log("scoreTimer:" + seconds);
   		}, 200);
               
               index = data[0].Question; 
               $("#afterAnswerModal").modal('hide');
               LoadQuestion();
               seconds = 0; 
               $('#myModal').modal('hide');
	      } else if(data[0].Status==2) {
                showWaitingModal();
              } else{// need to check if won or not
		      window.location ="winner.html";  
              } 
	  }
    }).fail(function(data) {
            console.error("fail:" + data);
    }).always(function(data) {
            console.log("always:" + data);
    });
}

function showWaitingModal() {
    $('#myModal').modal('show');
}

function setAnswer(answerUser) {
    // user.Id;
    // dataQuestion[index].Id;
    // answerUser
    // time
    // dataQuestion[index].CorrectAnswer == answerUser
    
    var correct;
    if(dataQuestion[index].CorrectAnswer == answerUser){
    	correct = 1;
    }else {
    	correct = 0;
    }
    var s = "setAnswer.php?req=setAnswer" + 
	  "&UserId=" + localStorage.generalId + 
	  "&QuestionId=" + dataQuestion[index].Id + 
	  "&Answer=" + answerUser + 
	  "&Time=" + seconds + 
	  "&IsCorrectAnswer=" + correct;
    
    console.log(s);
    
	// updaing the database (insert and update)
	  var result = $.ajax(s).done(function(data) {
	
	 $("#afterAnswerModal").modal('show');
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
    
	// Populate the page with questions
    $.ajax("getQuestions.php?req=getQuestions&gameId=" + gameId).done(function(data) {
            index=-1;  
            dataQuestion = $.parseJSON(data);
           // LoadQuestion();
            //check against the server if the game has ended or not
            checkServer();
           
	    
            console.log("good:" + data);
    }).fail(function(data) {
            console.error("fail:" + data);
    }).always(function(data) {
            console.log("always:" + data);
    });

  
    
}



/* check if the server changed the status of the game or moved to the next question */
timer = setInterval(checkServer, 5000);

