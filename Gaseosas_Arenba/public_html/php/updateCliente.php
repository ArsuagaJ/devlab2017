<?php

    session_start();
    // recuperamos los valores de la variable post - array con valores -- con el mismo nombre descriptivo que el JS
    // ejemplo, en el archivo 'producto_agregar.js' nombramos el valor de la variable 'descripcion' de la forma 'descrip'
    $nomb = filter_input(INPUT_POST,'nombre');
    $ape = filter_input(INPUT_POST,'apellido');
    $email = filter_input(INPUT_POST,'email');
    $tele = filter_input(INPUT_POST,'tel');
    $tel = (int)$tele;
    $loca = filter_input(INPUT_POST,'local');
    $dire = filter_input(INPUT_POST,'direcc');
    $provi = filter_input(INPUT_POST,'prov');
    $dni = filter_input(INPUT_POST,'dni');
    $dn = (int)$dni;
    $id = $_SESSION['id_usuario'];
    $idU = (int)$id;

    //include('./conexion.php');
    include('./cliente.php');
    include('./usuario.php');
    
    // instanciamos un objeto "ListaCodigo"
    $cliente = new Cliente();
    $usuario = new Usuario();
    
    $id2 = $usuario->updateNombreYApellidoUsuario($idU,$nomb,$ape);
    //echo $ok;
    $cliente->updateCliente($id2,$email,$tele,$loca,$dire,$provi,$dni);
    
    $algo = $usuario->getUsuarioByID($id2); //tomamos los nuevos valores que se guardaron recien
    $datos = $cliente->getDatosClienteById($id2); //de aca tambien
    
    $_SESSION['nombre'] = $algo['nombre'];
    $_SESSION['apellido'] = $algo['apellido'];
    $_SESSION['email'] = $datos['email'];
    $_SESSION['telefono'] = $datos['telefono'];
    $_SESSION['localidad'] = $datos['localidad'];
    $_SESSION['direccion'] = $datos['direccion'];
    $_SESSION['provincia'] = $datos['provincia'];
    $_SESSION['dni'] = $datos['dni'];
    
    //echo '<script> window.location="./usuario_cuenta.php"; </script>';
    // llamamos al metodo INSERTAR del Objeto ListaCodigo
    //if($ok){
      //  
    //}
    //$id,$fechaInicio,$fechaFin,$nombreArchivo,$descripcion,$estado ... asi se pasan los parametros para actualizar
?>