 <?php
    session_start();
    //include 'serv.php';
    if(isset($_SESSION['user'])){
        echo '<script> window.location="./validar.php"; </script>';
    }
    include "../html/index.html"
?>

