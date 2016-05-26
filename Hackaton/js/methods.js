
var getQuestions = function() {
    
    $.get("getQuestions.php?req=getQuestions", function (data) {
        echo $data;
    });
}