<?php
//operations are "get_movies" "get_users" "get_screen" "get_res" 

$servername = "localhost";
$DBcred = "root";
$DBpass = "";
$DBname ="cinema_reservation";

$conn = new mysqli($servername, $DBcred, $DBpass,$DBname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


$screen= isset($_POST['screen']) ? $_POST['screen'] : '';
$seats= json_decode( isset($_POST['seats']) ? $_POST['seats'] : '');

foreach( $seats as $seat ){
    $sql='INSERT INTO `reservations`(`screen`, `seat_row`, `seat_col`) VALUES ("'.$screen.'", "'.$seat[0].'","'.$seat[1].'")';
    if (! mysqli_query($conn, $sql)){
        echo "Error: " . mysqli_error($conn);
        exit();
    }
}
echo "New records created successfully"; 

mysqli_close($conn);
?>