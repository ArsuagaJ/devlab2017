<?php 
    // recuperamos los valores de la variable post - array con valores -- con el mismo nombre descriptivo que el JS
    // ejemplo, en el archivo 'producto_agregar.js' nombramos el valor de la variable 'descripcion' de la forma 'descrip'
    $data = json_decode(filter_input(INPUT_POST,'arrayData'));
    $arrayCodigos = $data[0];
    $idUsuario = $data[2];
    $idListaCodigo = $data[1];
    $estadoCanje = true;

    //include('./conexion.php');
    include('./codigo.php');
    
    // instanciamos un objeto "Codigo"
    $codigo = new Codigo();
    
    $largo = sizeOf($arrayCodigos);
    try{
        for($i = 0; $i < $largo; ++$i) {
            $codigo->insertarCodigo($arrayCodigos[$i],$estadoCanje,$idListaCodigo,$idUsuario);
        }
    }catch (PDOExepction $e){
        print "Error!: " . $e->getMessage();
        echo("Se ha producido un error al agregar los registros");
    }
    
    // llamamos al metodo INSERTAR del Objeto Codigo
    //$codigo->insertarCodigos($arrayCodigos,$estadoCanje,$idListaCodigo,$idUsuario);

?>