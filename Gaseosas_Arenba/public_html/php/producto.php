<?php

    class Producto{
        private $idProducto;
        private $strNombreProducto;
        private $strDescripcionProducto;
        private $strFoto;
        private $intPuntosCanje;
        private $boolEstado;
        private $conn;

        function __construct(){
            $this->idProducto = "";
            $this->strNombreProducto = "";
            $this->strDescripcionProducto = "";
            $this->strFoto = "";
            $this->intPuntosCanje = 0;
            $this->boolEstado = false;
        }
     
        function getIdProducto() {
            return $this->idProducto;
        }

        function getStrNombreProducto() {
            return $this->strNombreProducto;
        }

        function getStrDescripcionProducto() {
            return $this->strDescripcionProducto;
        }

        function getStrFoto() {
            return $this->strFoto;
        }

        function getIntPuntosCanje() {
            return $this->intPuntosCanje;
        }

        function getBoolEstado() {
            return $this->boolEstado;
        }

        function setIdProducto($idProducto) {
            $this->idProducto = $idProducto;
        }

        function setStrNombreProducto($strNombreProducto) {
            $this->strNombreProducto = $strNombreProducto;
        }

        function setStrDescripcionProducto($strDescripcionProducto) {
            $this->strDescripcionProducto = $strDescripcionProducto;
        }

        function setStrFoto($strFoto) {
            $this->strFoto = $strFoto;
        }

        function setIntPuntosCanje($intPuntosCanje) {
            $this->intPuntosCanje = $intPuntosCanje;
        }

        function setBoolEstado($boolEstado) {
            $this->boolEstado = $boolEstado;
        }
        
        /* estas funciones por el momento no funcan
        function conectarBD(){
            return include('./conexion.php');
        }
        
        function cerrarConexionBD(){
            include('./desconexion.php');
        }*/
        
        function getPuntosDeProductoPorId($id_produc){
            include './conexion.php';

            $stmt = $conn->prepare("SELECT puntos FROM producto WHERE id_producto=:id_producto");
            $stmt->bindParam(':id_producto', $id_produc);
            
            $stmt->execute();
            
            $result = $stmt->fetch();
            return $result;
        }
        
        function getProductoByID($id_producto){
            include './conexion.php';

            $stmt = $conn->prepare("SELECT id_producto, nombre, descripcion, foto, puntos, estado FROM producto WHERE id_producto=:id_producto");
            $stmt->bindParam(':id_producto', $id_producto);
            
            $stmt->execute();
            
            $result = $stmt->fetch();
            
            
            return $result;
        }
        
        function getProductosActivos(){
            include './conexion.php';            
            $stmt = $conn->prepare("SELECT `id_producto`, `nombre`, p.descripcion as 'descripcion', `foto`, `puntos`, ep.descripcion AS 'estado' FROM `producto` AS P INNER JOIN estado_producto as ep ON p.estado=ep.id_estado WHERE p.estado = '0'");
            
            $stmt->execute();
            
            $result = $stmt->fetchAll();
            
            return $result;
        }
        
        function getProductosByNameOrDescript($nomb){
            include './conexion.php';            
            $stmt = $conn->prepare("SELECT id_producto, nombre, descripcion, foto, puntos, estado FROM producto WHERE nombre LIKE ? OR descripcion LIKE ?");
            $stmt->bindValue(1,"%{$nomb}%", PDO::PARAM_STR);
            $stmt->bindValue(2,"%{$nomb}%", PDO::PARAM_STR);
            
            $stmt->execute();
            
            $result = $stmt->fetchAll();
            
            return $result;
        }
        
        function getProductos(){
            
            include('conexion.php');
            
            $sql = 'SELECT id_producto, nombre, descripcion, foto, puntos, estado FROM producto';
            //$statmt = $conn->prepare($sql); con esta funcion no me funciona...
            $result = $conn->query($sql);
            // Extraer los valores de $result
            $filas = $result->fetchAll();
            
            return $filas; // retornamos los valores
            
        }
        
        function insertar($nomb,$desc,$foto,$punt,$esta){
           
            // realizamos la conexion
            include('conexion.php');

            $ultimoId;
            //ejecutamos el insert
            //$statmt->execute();
            try{
                //preparamos la consulta insert
                $statmt = $conn->prepare("INSERT INTO `producto`(`nombre`, `descripcion`, `foto`, `puntos`, `estado`) VALUES ('$nomb','$desc','$foto','$punt','$esta')");
                try { 
                    $conn->beginTransaction(); 
                     //ejecutamos el insert
                    $statmt->execute(); 
                    $conn->commit();
                    $stmt = $conn->query("SELECT LAST_INSERT_ID()"); // para poder retornar el ultimo id generado
                    $lastId = $stmt->fetchColumn();
                    $ultimoId = $lastId;
                    //$ultimoId = $conn->lastInsertId(['id_producto']); // devolvemos el ultimo id insertado
                }catch(PDOExecption $e) { 
                    $conn->rollback(); 
                    print "Error!: " . $e->getMessage() . "</br>"; 
                } 
            }catch( PDOExecption $e ) { 
                print "Error!: " . $e->getMessage() . "</br>"; 
            } 
            echo $ultimoId;
            /*}else{
                echo '<script>';
                echo 'console.log("No funca")';
                echo '</script>';
                
                echo (filter_input_array($_POST));
            }*/
            
            
            // realizamos la desconexion de la BD
            include('desconexion.php');
        }
        
        function updateProducto($idProducto,$nombreProducto,$puntos,$descripcion){
            include('./conexion.php');
            try{
                $sql = "UPDATE producto SET nombre = :nombreProducto,  
			descripcion = :descripcion,  
			puntos = :puntos  
			WHERE id_producto = :id_producto";
                $stmt = $conn->prepare($sql);                                  
                $stmt->bindParam(':nombreProducto', $nombreProducto, PDO::PARAM_STR);
                $stmt->bindParam(':descripcion', $descripcion, PDO::PARAM_STR); 
                $stmt->bindParam(':puntos', $puntos, PDO::PARAM_INT);   
                $stmt->bindParam(':id_producto', $idProducto, PDO::PARAM_INT);   
                $stmt->execute();
            }catch( PDOExecption $e ) { 
                print "Error!: " . $e->getMessage() . "</br>"; 
            }
            // realizamos la desconexion de la BD
            include('./desconexion.php');
        }
                
        //la funcion que sigue era de prueba
        /*function guardarDatos(){
            // incluimos el archivo de conexion con los datos y variables del mismo.
            include('conexion.php');
            //$servername = "localhost";$username = "root";$password = "";
            //$dbname = "gaseosaarenba";
            //$this->conectarBD();
            //$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username,$password);
            //$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            
            // preparamos la consulta, falta pasar los valores por parametros
            $statmt = $conn->prepare("INSERT INTO `producto`(`nombre`, `descripcion`, `foto`, `puntos`, `estado`) VALUES ('producto1','producto de prueba inicial','foto00001.jpg',15000,true)");
            
            //ejecutamos la consulta preparada.
            $statmt->execute();

            /*$resultado = $statmt->fetchAll();
            foreach ($resultado as $row) {
                echo $row["apellido"];
            }*/
        function darBajaProducto($id_producto){
            include('./conexion.php');
            //$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username,$password);
            try{
                $sql = "UPDATE producto SET estado = 1  
			WHERE id_producto = :id_producto";
                $stmt = $conn->prepare($sql);  
                $stmt->bindParam(':id_producto', $id_producto, PDO::PARAM_INT);   
                $stmt->execute(); 

            }catch( PDOExecption $e ) { 
                print "Error!: " . $e->getMessage() . "</br>"; 
            }         
            
            // realizamos la desconexion de la BD
            include('desconexion.php');
        }
        
    }
    
    // instanciamos un objeto "Producto"
    //$producto = new Producto();
    
    // llamamos al metodo INSERTAR
    // hay que tomar los datos del campo del html de producto_agregar y pasarlos como parametros aca.
    //$producto->insertar();
    //$producto->cerrarConexionBD();
    //$producto->getProductoByID('1');
    
?>
