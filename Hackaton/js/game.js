
  var dataQuestion; 
var index;//index of question in dataQuestion
var flag;//interval stopper
var gameId=1; // for testing purposes


function LoadQuestion() {
    



    $("question-area").empty(); 
	$("input1").empty(); 
	$("input2").empty(); 
	$("input3").empty(); 
	$("input4").empty(); 
    
       var trHtml = "";
        trHtml = "<h>" + data[index].Text+ "</h>";
        
    $("#question-area").append(trHtml);
		$("#input1").val(dataQuestion[index].Answer1);
		$("#input2").val(dataQuestion[index].Answer2);
		$("#input3").val(dataQuestion[index].Answer3);
		$("#input4").val(dataQuestion[index].Answer4);


            

}
function checkServer(){
   $.ajax({
       type:"POST",
       url: "getCurrentQuestion.php",
       data:{dataQuestion.GameId},
      success:function(data){
       if(data!=dataQuestion[index].Id)
       {
       flag=null;
       if(data.Status==0){
       index++;
       LoadQuestion();
   }
       else
       window.location("winner.html");
}
   
}
   }
       
   }
       
       
   }
       
   });
    
}

function saveQuestion(answerUser) {
    var userAnswer = {};

    userAnswer.answer =answerUser;
    

           flag=setInterval(checkServer(), 1000);


    
    // save to storage

}

    
$(document).ready(function() {
    onLoading();
})   ;
        
function onLoading()
{
   
   
   dataQuestion = $.ajax("getQuestions.php?req=getQuestions&gameId=" + gameId).done(function(data) {
            alert("good:" + data);
    }).fail(function(data) {
            alert("fail:" + data);
    }).always(function(data) {
            alert("always:" + data);
    });
     


      index=dataQuestion[0];  

    LoadQuestion();    

}