<?php
$servername = "localhost";
$DBcred = "root";
$DBpass = "";
$DBname ="cinema_reservation";



// Create connection
$conn = new mysqli($servername, $DBcred, $DBpass,$DBname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully <br>";

$op= isset($_POST['op']) ? $_POST['op'] : '';

if($op=="add"){
    $movie_name= isset($_POST['movie_name']) ? $_POST['movie_name'] : '';
    $genre= isset($_POST['genre']) ? $_POST['genre'] : '';
    $screen= isset($_POST['screen']) ? $_POST['screen'] : '';
    $length= isset($_POST['length']) ? $_POST['length'] : '';


    $sql='INSERT INTO `movies`( `movie_name`, `genre`, `screen`, `length`) VALUES ("'.$movie_name.'", "'.$genre.'", "'.$screen.'", "'.$length.'")';
   

    if (mysqli_query($conn, $sql)) {
        echo "New record created successfully";
     } else {
        echo "Error: " . mysqli_error($conn);
     }

}else if ($op=="edit_movie"){
 
}

mysqli_close($conn);
?>