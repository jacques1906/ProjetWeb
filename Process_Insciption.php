<?php

$response = array('status' => 'success', 'message' => 'Données transmises avec succès !' ) and print_r($_POST) and var_dump($password_hash);

$password_hash = password_hash($_POST["password"], PASSWORD_DEFAULT);

$mysqli = require __DIR__ . "/database.php";

$sql = "INSERT INTO user (name, email, password_hash)
        VALUES (?, ?, ?)";
        
$stmt = $mysqli->stmt_init();

if ( ! $stmt->prepare($sql)) {
    die("SQL error: " . $mysqli->error);
}

$stmt->bind_param("sss",
                  $_POST["nom"],
                  $_POST["adressemail"],
                  $password_hash);
                  
if ($stmt->execute()) {

    header("Location: inscription-success.html");
    exit;
    
} else {
    
    if ($mysqli->errno === 1062) {
        die("email already taken");
    } else {
        die($mysqli->error . " " . $mysqli->errno);
    }
}