<?php
/*
This file send all the data from questions table (question text,image,video url,answer1,answer2,answer3,answer4,correct answer number)
*/
  try{
        require_once ('db_connection.php');	
       if (isset($_GET['req']) && $_GET['req'] == "setAnswer") {
                
            $UserId = $_GET['UserId'];
            $QuestionId = $_GET['QuestionId'];
            $Answer = $_GET['Answer'];
            $Time = $_GET['Time'];
            $IsCorrectAnswer = $_GET['IsCorrectAnswer']; 
        
            $insert  = $db->exec("INSERT INTO users_answers (UserId,QuestionId,Answer,Time,IsCorrectAnswer) 
                VALUES ('$UserId','$QuestionId','$Answer','$Time','$IsCorrectAnswer')");
            if( $insert !== FALSE ) {
                echo 1;
            } else {
                echo -1;
            }
       }
    
    } catch (PDOException $e) {
        echo $e->getMessage();
    } 
?>