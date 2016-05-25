 var firsttime=0;  
var index=0;
var ans;
function LoadQuestion() {
    var flag=false;

var q="Where is our university located?";
var answer=[];

    $("question-area").empty(); 
	$("input1").empty(); 
	$("input2").empty(); 
	$("input3").empty(); 
	$("input4").empty(); 
    
    var data;

    if (localStorage.dataArray === undefined) {
        dat = [];
		
    } else {
        
        dat = JSON.parse(localStorage.dataArray); 
        index++;
    }
    
       var trHtml = "";
        trHtml = "<h>" + dat[index].question+ "</h>";
        
    $("#question-area").empty();
    $("#question-area").append(trHtml);
		$("#input1").val(dat[index].op1);
		$("#input2").val(dat[index].op2);
		$("#input3").val(dat[index].op3);
		$("#input4").val(dat[index].op4);
       // setTimeout(checkServer(), 1000);

            

}

function saveQuestion(answerUser) {
    var userAnswer = {};

    userAnswer.answer =answerUser;
    
    if(answerUser==dat[index].answer)
        localStorage.answer = JSON.stringify(true);
    else
        localStorage.answer = JSON.stringify(false);
    

      index++;
    
    

    
    // save to storage

    onload();

}

        
function onLoading()
{
    var data = [{question:"Where is our university located?",answer:"Ariel", op1:"Tel-Aviv", op2:"Haifa", op3:"Ariel", op4: "Eilat"},
    {question:"Where is our university 1?",answer:"Ariel", op1:"Tel-Aviv", op2:"Haifa", op3:"Ariel", op4: "Eilat"},
    {question:"Where is our university 2?",answer:"Ariel", op1:"Tel-Aviv", op2:"Haifa", op3:"Ariel", op4: "Eilat"},
    {question:"Where is our university 3?",answer:"Ariel", op1:"Tel-Aviv", op2:"Haifa", op3:"Ariel", op4: "Eilat"}];

    

if(firsttime==0){
    localStorage.dataArray = JSON.stringify(data);

    firsttime=1;
LoadQuestion();

}
    LoadQuestion();
}   


    
function getWinner(score,win,lost) {

		$("#points-area").val(score);
		$("#right-area").val(win);
		$("#wrong-area").val(lost);

}


function requestStatus(){
	
	var dataArray;
    if (localStorage.dataArray === undefined) {
        dataArray = [];
    } else {
        dataArray = JSON.parse(localStorage.dataArray);
    }
	
	
	switch(status){ 
		
		
		case wait:

		break;
		
		case getQ:
		
		break;
		
		
		case endGame:
		
		break;
		
		default:
		break;
	}
	
}
