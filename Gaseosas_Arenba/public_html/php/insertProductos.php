<?php

    // recuperamos los valores de la variable post - array con valores -- con el mismo nombre descriptivo que el JS
    // ejemplo, en el archivo 'producto_agregar.js' nombramos el valor de la variable 'descripcion' de la forma 'descrip'
    $nombre = filter_input(INPUT_POST,'nombre');
    $descripci = filter_input(INPUT_POST,'descrip');
    $fotito = filter_input(INPUT_POST,'img');
    $puntaje = filter_input(INPUT_POST,'punt');
    $estate = filter_input(INPUT_POST,'estado');

    //include('./conexion.php');
    include('./producto.php');
    
    // instanciamos un objeto "Producto"
    $producto = new Producto();
    
    // llamamos al metodo INSERTAR
    // hay que tomar los datos del campo del html de producto_agregar y pasarlos como parametros aca.
    $producto->insertar($nombre,$descripci,$fotito,$puntaje,$estate);
    
?>
