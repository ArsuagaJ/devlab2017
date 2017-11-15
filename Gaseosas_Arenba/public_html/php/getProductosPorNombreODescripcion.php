<?php
//recuperamos el valor de la variable que viene por get
    $name = filter_input(INPUT_GET,'nameDescrip');

    require_once './conexion.php';
    require_once './producto.php';
    
    //Filtro anti-XSS
    /* no parece funcionar, habria que probarlo
    $caracteres_malos = array("<", ">", "\"", "'", "/", "<", ">", "'", "/");
    $caracteres_buenos = array("&lt;", "&gt;", "&quot;", "&#x27;", "&#x2F;", "&#060;", "&#062;", "&#039;", "&#047;");
    // hay que reemplazarlos por el name para evitar Cross Site Scripting
    $name = str_replace($caracteres_malos, $caracteres_buenos, $name);*/
    
    $producto = new Producto();
    
    $resultado = $producto->getProductosByNameOrDescript($name);// ejecutamos la consulta y retornamos resultado
    $longitud = sizeof($resultado);// medimos el largo, para saber si hay o no registros
    
    $respuesta = array();// creamos un array que sera lo que devolveremos como JSON
    
    if($longitud == 0){
        array_push($respuesta,array("resultado" => "nodata"));
    }else{
        array_push($respuesta,array("resultado" => "ok")); // establecemos un control con OK como resultado
        // Recorremos con un foreach todas las respuestas que nos devolvio la BDD
        foreach ($resultado as $row) {
        //Guardamos los datos en un array
            $datos = array(
                //'resultado' => 'ok', //este campo creo que esta de mas, pero por las dudas lo dejamos, creo que es de comprobacion
                'nombre' => $row['nombre'], 
                'descripcion' => $row['descripcion'], 
                'foto' => $row['foto'],
                'puntos' => $row['puntos'],
                'estado' => $row['estado']
            );
            // agregamos el array de la fila al array general '$respuesta' que se devolvera como objeto JSON
            array_push($respuesta,$datos);
        }
    }

    //Seteamos el header de "content-type" como "JSON" para que jQuery lo reconozca como tal
    header('Content-Type: application/json');
    /*$datos = array(
        'resultado' => 'ok', //este campo creo que esta de mas, pero por las dudas lo dejamos
        'nombre' => $resultado['nombre'], 
        'descripcion' => $resultado['descripcion'], 
        'foto' => $resultado['foto'],
        'puntos' => $resultado['puntos'],
        'estado' => $resultado['estado']
    );*/

    //Devolvemos el array pasado a JSON como objeto
    echo json_encode($respuesta, JSON_FORCE_OBJECT);
    
    require_once './desconexion.php'; // cerramos la conexion a la base de datos
?>
