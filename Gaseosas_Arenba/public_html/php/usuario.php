<?php

    class Usuario{
        private $idUsuario;
        private $strUsuario;
        private $strPassword;
        private $strRol;
        private $strNombre;
        private $strApellido;
        private $boolEstado;
        private $conn;

        function __construct(){
            $this->idUsuario = "";
            $this->strUsuario = "";
            $this->strPassword = "";
            $this->strRol = "";
            $this->strNombre = "";
            $this->strApellido = "";
            $this->boolEstado = false;
        }
     
        function getIdUsuario() {
            return $this->idUsuario;
        }

        function getStrUsuario() {
            return $this->strUsuario;
        }

        function getStrPassword() {
            return $this->strPassword;
        }

        function getStrRol() {
            return $this->strRol;
        }

        function getStrNombre() {
            return $this->strNombre;
        }

        function getStrApellido() {
            return $this->strApellido;
        }

        function setIdUsuario($idUsuario) {
            $this->idUsuario = $idUsuario;
        }

        function setStrUsuario($strNombreProducto) {
            $this->strNombreProducto = $strNombreProducto;
        }

        function setStrPassword($strPassword) {
            $this->strPassword = $strPassword;
        }

        function setStrRol($strRol) {
            $this->strRol = $strRol;
        }

        function setIntNombre($intNombre) {
            $this->intNombre = $intNombre;
        }
         
        function setIntApellido($setApellido) {
            $this->setApellido = $setApellido;
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
        
        function getUsuarioByID($id_usuario){
            include './conexion.php';

            $stmt = $conn->prepare("SELECT id_usuario, usuario, rol, nombre, apellido, estado FROM usuario WHERE id_usuario=:id_usuario");
            $stmt->bindParam(':id_usuario', $id_usuario);
            
            $stmt->execute();
            
            $result = $stmt->fetch();
            
            return $result;
        }
        
        function getUsuarioByNameOrRol($nomb){
            include './conexion.php';

            $stmt = $conn->prepare("SELECT usuario, rol, nombre, apellido, estado FROM usuario WHERE nombre LIKE ?");
            $stmt->bindValue(1,"%{$nomb}%", PDO::PARAM_STR);
   
           
            $stmt->execute();
            
        
            
            $result = $stmt->fetchAll();
            
            return $result;
        }
        
        
        function getUsuario(){
            
            include('conexion.php');
            
            $sql = 'SELECT id_usuario, usuario, password, rol, nombre, estado FROM usuario';
            //$statmt = $conn->prepare($sql); con esta funcion no me funciona...
            $result = $conn->query($sql);
            // Extraer los valores de $result
            $filas = $result->fetchAll();
            
            return $filas; // retornamos los valores
            
        }
        
        function insertar($nomb,$pass,$rol,$nombre,$apellido,$esta){
           
            $pass = md5($pass);
            // realizamos la conexion
            include('conexion.php');

            //preparamos la consulta insert
            $statmt = $conn->prepare("INSERT INTO `usuario`(`nombre`, `descripcion`, `foto`, `puntos`, `estado`) VALUES ('$nomb','$pass','$rol','$nombre','$apellido','$esta')");

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
        
    }
 
?>

