var questionData = [{question:"Where is our university located?",answer:"op3", op1:"Tel-Aviv", op2:"Haifa", op3:"Ariel", op4: "Eilat"}];
			   
function LoadQuestion() {
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
		index= JSON.parse(localStorage.dataArray);
    }
    
        var trHtml = "";
        trHtml =data[index].question;
        $("#question-area").value=trHtml);
		$("input1").value= data[index].op1;
		$("input2").value= data[index].op2;
		$("input3").value= data[index].op3;
		$("input4").value= data[index].op4;
}

function saveQuestion(var answer) {
    var store = {};

    store.dat =answer;

    
    // init / load current array
    var dataArray;
    if (localStorage.dataArray === undefined) {
        dataArray = [];
    } else {
        dataArray = JSON.parse(localStorage.dataArray);
    }
    
    // add new person to current array
    dataArray.push(store);
    
    // save to storage
    localStorage.dataArray = JSON.stringify(dataArray);
}