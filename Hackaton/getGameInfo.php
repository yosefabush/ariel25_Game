<?php
/*
This file send all the data from games table (Id Title,Status,Question) *Question is the current Question
*/
    try{
        require_once ('db_connection.php');	

        if (isset($_GET['req']) && $_GET['req'] == "getGameInfo"
           && isset($_GET['gameId'])) {
            $result = $db->query("SELECT * FROM games WHERE Id=".$_GET['gameId'])->fetchAll(PDO::FETCH_ASSOC);
            echo(json_encode($result));
        } 
        
        if (isset($_GET['req']) && $_GET['req'] == "getUser" && isset($_GET['userId'])) {
            $result = $db->query("SELECT * FROM users WHERE id=".$_GET['userId'])->fetchAll(PDO::FETCH_ASSOC);
            echo(json_encode($result[0]));
        } 

    } catch (PDOException $e) {
        echo $e->getMessage();
    } 
?>