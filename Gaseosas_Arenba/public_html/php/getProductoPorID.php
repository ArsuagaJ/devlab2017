<?php 
    //recuperamos el valor de la variable que viene por get
    $id = filter_input(INPUT_GET,'id_producto');

    require_once './conexion.php';
    require_once './producto.php';
    
    $producto = new Producto();
    
    $resultado = $producto->getProductoByID($id);
    
    //Seteamos el header de "content-type" como "JSON" para que jQuery lo reconozca como tal
    header('Content-Type: application/json');
    
    $datos = array(
        'resultado' => 'ok', //este campo creo que esta de mas, pero por las dudas lo dejamos
        'nombre' => $resultado['nombre'], 
        'descripcion' => $resultado['descripcion'], 
        'foto' => $resultado['foto'],
        'puntos' => $resultado['puntos'],
        'estado' => $resultado['estado']
    );

    //Devolvemos el array pasado a JSON como objeto
    echo json_encode($datos, JSON_FORCE_OBJECT);
    
    require_once './desconexion.php'; // cerramos la conexion a la base de datos
?>
