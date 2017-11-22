<?php
    
    $dni = filter_input(INPUT_POST,'dni');
    $telefono = filter_input(INPUT_POST,'telefono');
    $email = filter_input(INPUT_POST,'email');
    $provincia = filter_input(INPUT_POST,'provincia');
    $localidad = filter_input(INPUT_POST,'localidad');
    $direccion = filter_input(INPUT_POST,'direccion');
    $idUsuario = filter_input(INPUT_POST,'idUsuario');
    $idUser = (int)$idUsuario; //tuve que meterle este filtro, sino me daba error
    $puntos = filter_input(INPUT_POST,'puntos');
    $intentos = filter_input(INPUT_POST,'intentos'); //no recuerdo para que es este campo
    $token = filter_input(INPUT_POST,'token'); //menos para que sirve este campo
    $validacion = filter_input(INPUT_POST,'validacion'); // y ese ni hablamos.. ja
    
    include('./cliente.php');
    
    // instanciamos un objeto "cliente"
    $cliente = new Cliente();
    
    // llamamos al metodo INSERTAR
    $cliente->insertar($email,$telefono,$localidad,$direccion,$puntos,$intentos,$provincia,$token,$validacion,$dni,$idUser);
    
?>

