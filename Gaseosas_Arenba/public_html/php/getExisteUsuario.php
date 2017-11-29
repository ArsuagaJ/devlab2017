<?php
    session_start();
    $nombb = filter_input(INPUT_POST,'strUser');

    include './usuario.php';
    $user = new Usuario();
    //$stmt->bindParam(':localidad', $firstname);

    $respuesta = array();
    try{
        $resultado = $user->existUserByName($nombb);
        $longi = sizeof($resultado);
        
        if($resultado == null){
            array_push($respuesta,array("resultado" => "ok"));
        }else if($resultado != null){
            array_push($respuesta,array("resultado" => "no"));
        }
    } catch (PDOException $e){
        array_push($respuesta,array("resultado" => "fallo"));
    }
    //foreach ($resultado as $row) {
        //echo $row["apellido"];
    //}
    header('Content-Type: application/json');
    echo json_encode($respuesta);

?>
