<?php
    // recuperamos los valores de la variable post - array con valores -- con el mismo nombre descriptivo que el JS
    $idProducto = filter_input(INPUT_POST,'id');

    //include('./conexion.php');
    include('./producto.php');
    
    $producto = new Producto();
    
    $producto->darBajaProducto($idProducto);
?>
