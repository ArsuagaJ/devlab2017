<?php

    class Usuario{
        private $strUsuario;
        private $strPassword;
        private $intIdRol;
        private $strNombre;
        private $strApellido;
        private $boolEstado;
        private $conn;

        function __construct(){
            $this->strUsuario = "";
            $this->strPassword = "";
            $this->intIdRol = "";
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

        function getIntIdRol() {
            return $this->IntIdRol;
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

        function setIntIdRol($intIdRol) {
            $this->intIdRol = $intIdRol;
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

            $stmt = $conn->prepare("SELECT id_usuario, usuario, id_rol, nombre, apellido, estado FROM usuario WHERE id_usuario=:id_usuario");
            $stmt->bindParam(':id_usuario', $id_usuario);
            
            $stmt->execute();
            
            $result = $stmt->fetch();
            
            return $result;
        }
        
        function getUsuarioByName($nomb){
            include './conexion.php';

            $stmt = $conn->prepare("SELECT usuario, id_rol, nombre, apellido, estado FROM usuario WHERE nombre LIKE ?");
            $stmt->bindValue(1,"%{$nomb}%", PDO::PARAM_STR);
    
            $stmt->execute();
            
            $result = $stmt->fetchAll();
            
            return $result;
        }
        
       /* function getUsuarioByName1($nomb){
            include './conexion.php';

            $stmt = $conn->prepare("SELECT us.`id_usuario`, us.`usuario`, us.`password`, us.`nombre`, us.`apellido`, us.`estado`, rol.`id_rol`, rol.`nombre` FROM `usuario` us , `rol` WHERE us.id_rol = rol.id_rol nombre LIKE ?");
            $stmt->bindValue(1,"%{$nomb}%", PDO::PARAM_STR);
    
            $stmt->execute();
            
            $result = $stmt->fetchAll();
            
            return $result;
        }*/
        
         
        function getUsuarioByNameOrRol($nomb){
            include './conexion.php';

            $stmt = $conn->prepare("SELECT usuario, id_rol, nombre, apellido, estado FROM usuario WHERE nombre LIKE ?");
            $stmt->bindValue(1,"%{$nomb}%", PDO::PARAM_STR);
   
           
            $stmt->execute();
            
        
            
            $result = $stmt->fetchAll();
            
            return $result;
        }
        
        
        function getUsuario(){
            
            include('conexion.php');
            
            $sql = 'SELECT id_usuario, usuario, password, id_rol, nombre, estado FROM usuario';
            //$statmt = $conn->prepare($sql); con esta funcion no me funciona...
            $result = $conn->query($sql);
            // Extraer los valores de $result
            $filas = $result->fetchAll();
            
            return $filas; // retornamos los valores
            
        }
        function getUsuarioAndPass($user, $pass){
            
            include('./conexion.php');
            $result;
            try {

                $sql = 'SELECT id_usuario, usuario, password, id_rol, nombre, estado FROM usuario WHERE usuario=:user AND password=:pass';
                $stmt=$conn->prepare($sql);
                $stmt->bindParam(':user', $user);
                $stmt->bindParam(':pass', $pass);
                //$statmt = $conn->prepare($sql); con esta funcion no me funciona...
                $stmt->execute();
                $result = $stmt->fetch();
             } catch (Exception $ex) {
                echo('<script> "cho" </script>');
                echo($ex->getMessage());
            }
            return $result; // retornamos los valores
            
        }
        
        function insertar($nombreUsuario,$password,$nombre,$apellido,$id_rol){
           
            $pass = md5($password);
            // realizamos la conexion
            include('conexion.php');

            //preparamos la consulta insert
            $statmt = $conn->prepare("INSERT INTO `usuario`(`usuario`, `password`, `nombre`, `apellido`, `estado`, `id_rol`) VALUES ('$nombreUsuario','$pass','$nombre','$apellido','1','$id_rol')");

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

