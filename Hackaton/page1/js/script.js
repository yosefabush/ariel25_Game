var i=0;
var arr=[];

var gameId = 1000;

function onInit() {
    // TODO:
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
}

$(document).ready(onInit);