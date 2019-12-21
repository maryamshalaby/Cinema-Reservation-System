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

$op= isset($_POST['op']) ? $_POST['op'] : 'get_res';

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
    $movie_name= isset($_POST['movie_name']) ? $_POST['movie_name'] : 'The Lion King';
    $movie_time= isset($_POST['movie_time']) ? $_POST['movie_time'] : '2019-12-01 05:10:10';

    $sql='SELECT `seat_row`,`seat_col` FROM `reservations` WHERE `movie_name`="'.$movie_name.'" and `movie_time`="'.$movie_time.'";';
    $result = mysqli_query($conn, $sql);
    

    if (mysqli_num_rows($result) > 0) {
        
        echo json_encode(mysqli_fetch_all($result));
    } else {
           echo "Error: " . mysqli_error($conn);
    }

}

mysqli_close($conn);
?>