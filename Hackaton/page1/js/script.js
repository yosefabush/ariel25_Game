var question1={question:"q1",answer1:"a1",answer2:"a2", answer3:"a3",answer4:"a4"};
var question2={question:"q2", answer1:"an1", answer2:"an2", answer3:"an3", answer4:"an4"};
var question3={question:"q3", answer1:"ana1", answer2:"ana2", answer3:"ana3", answer4:"ana4"};
var question4={question:"q4", answer1:"ang1", answer2:"ang2", answer3:"ang3", answer4:"ang4"};

var i=0;
var arr=[question1,question2,question3,question4];

function onInit() {
    showCurrentQuestion();
}

function showCurrentQuestion() {
    if(i>=arr.length)
        return;
    else{
        $('#q').text(arr[i].question);
        $("#a1").text(arr[i].answer1);
        $("#a2").text(arr[i].answer2);
        $("#a3").text(arr[i].answer3);
        $("#a4").text(arr[i].answer4); 
    }
}

function loadNextQuestion() {
    i++;
    showCurrentQuestion();
}

$(document).ready(onInit);