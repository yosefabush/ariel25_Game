function onload()
function LoadQuestion() {
    var flag=false;
    var questionData =   [{question:"Where is our university located?",answer:"op3", op1:"Tel-Aviv", op2:"Haifa", op3:"Ariel", op4: "Eilat"}];
var q="Where is our university located?";
var answer=[];
var index=0;
    $("question-area").empty(); 
	$("input1").empty(); 
	$("input2").empty(); 
	$("input3").empty(); 
	$("input4").empty(); 
    
    var dataArray;
	var index;
    if (localStorage.dataArray === undefined) {
        dataArray = [];
		index=0;
    } else {
        dataArray = JSON.parse(localStorage.dataArray);
		//index= JSON.parse(localStorage.dataArray);
    }
    
       
        $("#question-area").text(dataArray[index].question);
		$("#input1").val(questionData[index].op1);
		$("#input2").val(questionData[index].op2);
		$("#input3").val(questionData[index].op3);
		$("#input4").val(questionData[index].op4);
        setInterval(checkServer(), 1000);
    function checkServer(){
    var answer=JSON.parse(localStorage.dataArray);
    if(answer=true)
        clearInterval(0);
        
            

}

function saveQuestion(answerUser) {
        var questionData =   [{question:"Where is our university located?",answer:"op3", op1:"Tel-Aviv", op2:"Haifa", op3:"Ariel", op4: "Eilat"}];
var q="Where is our university located?";
var answer=[];
var index=0;
    var userAnswer = {};

    userAnswer.answer =answerUser;
    userAnswer.index= 0;
    if(answerUser.equals(questionData[index].answer))
        localStorage.dataArray = JSON.stringify(true);
    else
        localStorage.dataArray = JSON.stringify(false);

    
    
    
    // init / load current array
    var dataArray;
    if (localStorage.dataArray === undefined) {
        dataArray = [];
    } else {
        dataArray = JSON.parse(localStorage.dataArray);
    }
    
    // add new person to current array
    dataArray.push(userAnswer);
    
    // save to storage
    localStorage.dataArray = JSON.stringify(dataArray);

}

    
}
