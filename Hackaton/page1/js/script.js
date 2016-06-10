var i=0;
var arr=[];

var gameId = localStorage.gameId;

//setInterval(checkServer(), 1000);

function onInit() {
    // LOAD ALL QUESTIONS
    $.get( "../getQuestions.php?req=getQuestions&gameId=" + gameId, function( data ) {
       arr = $.parseJSON(data);
       console.log('arr:' + arr);
       showCurrentQuestion();
        
        
    });     
}

function showCurrentQuestion() {
    if(i>=arr.length)
        return;
    else{
        $('#q').text(arr[i].Text);
        $("#a1").text(arr[i].Answer1);
        $("#a2").text(arr[i].Answer2);
        $("#a3").text(arr[i].Answer3);
        $("#a4").text(arr[i].Answer4); 
    }
}

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

$(document).ready(onInit);