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
        
        function getProductoByID($id_producto){
            include './conexion.php';

            $stmt = $conn->prepare("SELECT id_producto, nombre, descripcion, foto, puntos, estado FROM producto WHERE id_producto=:id_producto");
            $stmt->bindParam(':id_producto', $id_producto);
            
            $stmt->execute();
            
            $result = $stmt->fetch();
            
            
            return $result;
        }
        
        function getProductoByNameOrDescript($nomb){
            include './conexion.php';

            $stmt = $conn->prepare("SELECT nombre, descripcion, foto, puntos, estado FROM producto WHERE nombre LIKE ? OR descripcion LIKE ?");
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

            //preparamos la consulta insert
            $statmt = $conn->prepare("INSERT INTO `producto`(`nombre`, `descripcion`, `foto`, `puntos`, `estado`) VALUES ('$nomb','$desc','$foto','$punt','$esta')");

            //ejecutamos el insert
            $statmt->execute();
            
            /*}else{
                echo '<script>';
                echo 'console.log("No funca")';
                echo '</script>';
                
                echo (filter_input_array($_POST));
            }*/
            
            
            // realizamos la desconexion de la BD
            include('desconexion.php');
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
        
    }
    
    // instanciamos un objeto "Producto"
    //$producto = new Producto();
    
    // llamamos al metodo INSERTAR
    // hay que tomar los datos del campo del html de producto_agregar y pasarlos como parametros aca.
    //$producto->insertar();
    //$producto->cerrarConexionBD();
    //$producto->getProductoByID('1');
    
?>
