<?php
//operations are "login" "register"

$servername = "localhost";
$DBcred = "root";
$DBpass = "";
$DBname ="cinema_reservation";
$conn = new mysqli($servername, $DBcred, $DBpass,$DBname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


$op= isset($_POST['op']) ? $_POST['op'] : '';

if($op=="login"){

    $username= isset($_POST['username']) ? $_POST['username'] : '';
    $password= isset($_POST['pass']) ? $_POST['pass'] : '';

    $sql='SELECT `type` FROM `users` WHERE `username`="'.$username.'" and `password`="'.$password.'";';
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        while($row = mysqli_fetch_assoc($result)) {
           echo "type:" . $row["type"];
        }
     } else {
        echo "Error";
     }
   

}else{
    $username= isset($_POST['username']) ? $_POST['username'] : '';
    $password= isset($_POST['pass']) ? $_POST['pass'] : '';
    $first_name= isset($_POST['first_name']) ? $_POST['first_name'] : '';
    $last_name= isset($_POST['last_name']) ? $_POST['last_name'] : '';
    $birth_date= isset($_POST['birth_date']) ? $_POST['birth_date'] : '';
    $email= isset($_POST['email']) ? $_POST['email'] : '';
    $type= isset($_POST['type']) ? $_POST['type'] : 'customer';


    $sql='INSERT INTO `users`(`username`, `password`, `first_name`, `last_name`, `birth_date`, `email`, `type`) VALUES ("'.$username.'", "'.$password.'", "'.$first_name.'", "'.$last_name.'", "'.$birth_date.'", "'.$email.'", "'.$type.'")';
   
    if (mysqli_query($conn, $sql)) {
        echo "New record created successfully";
     } else {
        echo "Error: " . mysqli_error($conn);
     }
}

mysqli_close($conn);
?>