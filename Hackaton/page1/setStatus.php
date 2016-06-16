<?php
header("Access-Control-Allow-Origin: *");
/*
Logically should be in Administraion 
This file sets the status of the game to 1 (online)
*/
    try{
        
        
        require_once ('../db_connection.php');	
        $id = $_POST["gameId"];
		
		$res = $db->exec("UPDATE games SET Status = 1, Question = 0 WHERE Id = $id");
		
		if(  $res !== FALSE ) {
            echo 1;   
        } else {
            echo -1;
        }
    } catch (PDOException $e) {
        echo $e->getMessage();
    } 
?>