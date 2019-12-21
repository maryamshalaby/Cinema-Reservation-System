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

$op= isset($_POST['op']) ? $_POST['op'] : 'get_movies';

if($op=="get_movies"){

    $sql='SELECT `movie_name`, `genre`, `screen`, `length`, GROUP_CONCAT( `movie_times`.`movie_time` SEPARATOR "/") 
    from `movies` NATURAL JOIN `movie_times`  group by `movie_name`;';
    $result = mysqli_query($conn, $sql);
    

    if (mysqli_num_rows($result) > 0) {
        
        echo json_encode(mysqli_fetch_all($result));
    } else {
           echo "Error: " . mysqli_error($conn);
    }

}else if ($op=="get_users"){

    $sql='SELECT * FROM `users`';
    $result = mysqli_query($conn, $sql);
    

    if (mysqli_num_rows($result) > 0) {
        
        echo json_encode(mysqli_fetch_all($result));
    } else {
           echo "Error: " . mysqli_error($conn);
    }

} else if($op=="get_screen"){
    $screen= isset($_POST['screen']) ? $_POST['screen'] : '3';

    $sql='SELECT * FROM `screen` WHERE `screen_number`="'.$screen.'";';
    $result = mysqli_query($conn, $sql);
    

    if (mysqli_num_rows($result) > 0) {
        
        echo json_encode(mysqli_fetch_all($result));
    } else {
           echo "Error: " . mysqli_error($conn);
    }


} else if($op=="get_res"){
    $screen= isset($_POST['screen']) ? $_POST['screen'] : '1';

    $sql='SELECT * FROM `reservations` WHERE `screen`="'.$screen.'";';
    $result = mysqli_query($conn, $sql);
    

    if (mysqli_num_rows($result) > 0) {
        
        echo json_encode(mysqli_fetch_all($result));
    } else {
           echo "Error: " . mysqli_error($conn);
    }

}

mysqli_close($conn);
?>