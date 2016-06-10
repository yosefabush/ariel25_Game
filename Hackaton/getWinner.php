<?php
/*
This gets the winner in a specific game from the users table
*/
    try{
        require_once ('db_connection.php');	

        if (isset($_GET['req']) && $_GET['req'] == "getWinner" && isset($_GET['gameId'])) {
            $result = $db->query(
                "SELECT * FROM users"
                ." WHERE CurrentGame=".$_GET['gameId']." AND Score=(SELECT MAX(Score) FROM users)")->fetchAll(PDO::FETCH_ASSOC);
            echo(json_encode($result));
        }   
    } catch (PDOException $e) {
        echo $e->getMessage();
    } 
?>
