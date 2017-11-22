<?php
    session_start();
//recuperamos el valor de la variable que viene por get
    $email = filter_input(INPUT_POST,'email');
    $idUsuario = $_SESSION['id_usuario'];
    
    //echo '<script> alert($idUsuario)</script>';
    
    include("./invitacion.php");
    
    $invitacion = new Invitacion();
    
    $invitacion->enviarInvitacion($idUsuario,$email);// ejecutamos la consulta y retornamos resultado
    
    include "./enviadorDeEmail.php";
    
    enviarMailADestino("rosaril2009@gmail.com",$idUsuario);
    /*$longitud = sizeof($resultado);// medimos el largo, para saber si hay o no registros
    
    $respuesta = array();// creamos un array que sera lo que devolveremos como JSON
    try{
        if($longitud == 0){
            array_push($respuesta,array("resultado" => "nodata"));
        }else{
            array_push($respuesta,array("resultado" => "ok")); // establecemos un control con OK como resultado
            //$codigo->canjearClienteCodigo($resultado['id_codigo'],$code,$idUsuario);
            // Recorremos con un foreach todas las respuestas que nos devolvio la BDD
            foreach ($resultado as $row) {
            //Guardamos los datos en un array
                $datos = array(
                    //'resultado' => 'ok', //este campo creo que esta de mas, pero por las dudas lo dejamos, creo que es de comprobacion
                    'id_codigo' => $row['id_codigo'], 
                    'codigo' => $row['codigo']
                );
                // agregamos el array de la fila al array general '$respuesta' que se devolvera como objeto JSON
                array_push($respuesta,$datos);
            }
        }
        //array_push($respuesta,$idUsuario);

        $arraTemp = $respuesta[1];
        $idCodigo = $arraTemp['id_codigo'];
        array_push($respuesta,$arraTemp['id_codigo']);
        //array_push($respuesta,$varTemp);
        //$longit = sizeof($arraTemp);

        $idPrueba = $codigo->canjearClienteCodigo($idUsuario,$idCodigo,$code);
        $algo = $cliente->sumarPuntosCanje($idPrueba);
        array_push($respuesta,$algo);
        //echo '<script>alert("Se rompio");</script>';
    } catch (PDOExecption $e ) {
        array_push($respuesta,array("resultado" => "nodata"));
        print "Error!: " . $e->getMessage() . "</br>"; 
    }   */      

    //$codigo->canjearClienteCodigo($idUsuario,$idCodigo,$code);
    //Seteamos el header de "content-type" como "JSON" para que jQuery lo reconozca como tal
    //header('Content-Type: application/json');

    //echo json_encode($respuesta, JSON_FORCE_OBJECT);
    
    require_once './desconexion.php'; // cerramos la conexion a la base de datos
?>
