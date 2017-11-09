<?php
$usuario = $_POST['idUsuario'];
$pass = $_POST['idPassword'];

include_once './conexion.php';
$stmt = $conn->prepare("SELECT id_usuario, rol, nombre, apellido FROM usuario WHERE
id_usuario=1");
//$stmt->bindParam(':localidad', $firstname);
$stmt->execute();

$resultado = $stmt->fetchAll();
//foreach ($resultado as $row) {
    //echo $row["apellido"];
//}
echo json_encode($resultado);

?>
