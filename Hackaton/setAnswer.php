<?php
/*
This file will set the user Answer
*/
  try{
        require_once ('db_connection.php');	
       if (isset($_GET['req']) && $_GET['req'] == "setAnswer") {
                
            $UserId = $_GET['UserId'];
            $QuestionId = $_GET['QuestionId'];
            $Answer = $_GET['Answer'];
            $Time = $_GET['Time'];
            $IsCorrectAnswer = $_GET['IsCorrectAnswer'];
            $update = TRUE; 
        
            $insert  = $db->exec("INSERT INTO users_answers (UserId,QuestionId,Answer,Time,IsCorrectAnswer) 
                VALUES ('$UserId','$QuestionId','$Answer','$Time','$IsCorrectAnswer')");
	   /* if($insert === FALSE){
               $insert = $db->exec("UPDATE users_answers SET Answer = '$Answer',Time = '$Time', IsCorrectAnswer = '$IsCorrectAnswer' WHERE UserId = '$UserId' AND QuestionId = '$QuestionId' ");
             
            }*/	
	
			
            if( $insert !== FALSE ) {
                if( $IsCorrectAnswer==1 ) {
			$score = 10 - $Time;
			if ( $score < 0 ) {
				$score = 0;
			}
			$update = $db->exec("UPDATE users SET Score =  Score + '$score' WHERE UserId = '$UserId' ");
			
			if( $update !== FALSE){
			    echo 2;
			}    
		}else{
		    echo 1;
		}
            } else {
                echo -1;
            }
       }
    
    } catch (PDOException $e) {
        echo $e->getMessage();
    } 
?>
