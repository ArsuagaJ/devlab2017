<?php
    session_start();
    $usuario = $_SESSION['id_usuario'];
    $imeil = filter_input(INPUT_POST,'email');

    include './invitacion.php';
    $invit = new Invitacion();
    //$stmt->bindParam(':localidad', $firstname);

    $respuesta = array();
    try{
        $resultado = $invit->getInvitaciones($imeil,$usuario);
        $longi = sizeof($resultado);
        
        if($resultado != null){
            array_push($respuesta,array("resultado" => "no"));
        }else if($resultado == null){
            array_push($respuesta,array("resultado" => "ok"));
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
