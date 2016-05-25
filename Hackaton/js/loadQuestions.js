    var data = [{question:"Where is our university located?",answer:"op3", op1:"Tel-Aviv", op2:"Haifa", op3:"Ariel", op4: "Eilat"},
    {question:"Where is our university 1?",answer:"op3", op1:"Tel-Aviv", op2:"Haifa", op3:"Ariel", op4: "Eilat"},
    {question:"Where is our university 2?",answer:"op3", op1:"Tel-Aviv", op2:"Haifa", op3:"Ariel", op4: "Eilat"},
    {question:"Where is our university 3?",answer:"op3", op1:"Tel-Aviv", op2:"Haifa", op3:"Ariel", op4: "Eilat"}];
var q="Where is our university located?";
    var firsttime=0;           
function onLoading()
{
if(firsttime==0)
firsttime++;
LoadQeustions();
localStorage.dataArray = JSON.stringify(data);
}


    


