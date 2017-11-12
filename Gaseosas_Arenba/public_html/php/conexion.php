<?php
$servername = "localhost";$username = "root";$password = "";
$dbname = "gaseosaarenba";
$idUsuario= "1";
$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username,$password);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

/*lkjajsdjfladjkfjald*/

/*try {
$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username,
$password);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$stmt = $conn->prepare("SELECT id_usuario, rol, nombre, apellido FROM usuario WHERE
id_usuario=1");
//$stmt->bindParam(':localidad', $firstname);
$stmt->execute();

$resultado = $stmt->fetchAll();
    foreach ($resultado as $row) {
        echo $row["apellido"];
    }

}
catch(PDOException $e) {
echo "Error: " . $e->getMessage();
}*/
//$conn = null;

?>