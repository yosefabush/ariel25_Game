<?php
/*
This file send all the data from questions table (question text,image,video url,answer1,answer2,answer3,answer4,correct answer number)
*/
    try{
        require_once ('db_connection.php');	

        if (isset($_GET['req']) && $_GET['req'] == "getQuestions" && isset($_GET['gameId'])) {
            $result = $db->query("SELECT * FROM questions WHERE GameId=".$_GET['gameId'])->fetchAll(PDO::FETCH_ASSOC);
            echo(json_encode($result));
        } 

    } catch (PDOException $e) {
        echo $e->getMessage();
    } 
?>
