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

$movie_name= isset($_POST['movie_name']) ? $_POST['movie_name'] : 'The Lion King';
$movie_time= isset($_POST['movie_time']) ? $_POST['movie_time'] : '2019-12-01 05:10:10';
$seats= json_decode( isset($_POST['seats']) ? $_POST['seats'] : []);


foreach( $seats as $seat ){
    $sql='INSERT INTO `reservations`(`movie_name`,`movie_time`, `seat_row`, `seat_col`) VALUES ("'.$movie_name.'","'.$movie_time.'", "'.$seat[0].'","'.$seat[1].'")';
    if (! mysqli_query($conn, $sql)){
        echo "Error: " . mysqli_error($conn);
        exit();
    }
}
echo "New records created successfully"; 

mysqli_close($conn);
?>