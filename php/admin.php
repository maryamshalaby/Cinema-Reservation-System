<?php
//operations are "add_movie" "add_screening" "delete_movie" "add_admins"

$servername = "localhost";
$DBcred = "root";
$DBpass = "";
$DBname ="cinema_reservation";

$conn = new mysqli($servername, $DBcred, $DBpass,$DBname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$op= isset($_POST['op']) ? $_POST['op'] : 'update';

if($op=="add_movie"){
    $movie_name= isset($_POST['movie_name']) ? $_POST['movie_name'] : 'cats';
    $genre= isset($_POST['genre']) ? $_POST['genre'] : 'musical';
    $screen= isset($_POST['screen']) ? $_POST['screen'] : '3';
    $length= isset($_POST['length']) ? $_POST['length'] : '05:10:10';
    $times= json_decode( isset($_POST['times']) ? $_POST['times'] : '');


    $sql='INSERT INTO `movies`( `movie_name`, `genre`, `screen`, `length`) VALUES ("'.$movie_name.'", "'.$genre.'", "'.$screen.'", "'.$length.'")';
    

    if (mysqli_query($conn, $sql)) {
        //add all times
        foreach( $times as $time ){
            $sql='INSERT INTO `movie_times`(`movie_name`, `movie_time`) VALUES ("'.$movie_name.'", "'.$time.'");';
            if (! mysqli_query($conn, $sql)){
                echo "Error: " . mysqli_error($conn);
            }
        }
        echo "New record created successfully";
     } else {
           echo "Error: " . mysqli_error($conn);
     }
}else if ($op=="add_screening"){
    $movie_name= isset($_POST['movie_name']) ? $_POST['movie_name'] : 'cats';
    $times= json_decode( isset($_POST['times']) ? $_POST['times'] : '');
 
    foreach( $times as $time ){
        $sql='INSERT INTO `movie_times`(`movie_name`, `movie_time`) VALUES ("'.$movie_name.'", "'.$time.'");';
        if (! mysqli_query($conn, $sql)){
            echo "Error: " . mysqli_error($conn);
            exit();
        }
    }
    echo "New record created successfully";
} else if($op=="delete_movie"){
    $movie_name= isset($_POST['movie_name']) ? $_POST['movie_name'] : 'cats';
    $sql='DELETE FROM `movies` WHERE `movie_name`="'.$movie_name.'";';
    if (mysqli_query($conn, $sql)) {
        echo "Record deleted successfully";
     } else {
        echo "Error: " . mysqli_error($conn);
     }

} else if($op=="add_admins"){
    $usernames= json_decode( isset($_POST['movie_name']) ? $_POST['movie_name'] : '');
    foreach( $usernames as $user ){
        $sql='UPDATE `users` SET `type`="admin" WHERE `username`="'.$user.'";';
        if (! mysqli_query($conn, $sql)){
            echo "Error: " . mysqli_error($conn);
            exit();
        }
    }
    echo "Users updated successfully";

}

mysqli_close($conn);
?>