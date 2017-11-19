<?php

    class Rol{
        private $id_rol;
        private $strNombre;


        function __construct(){
            $this->idRol = "";
            $this->strNombre = "";
        }
     
        function getIdRol() {
            return $this->idRol;
        }

        function getStrNombre() {
            return $this->strNombre;
        }

        function setIdRol($idRol) {
            $this->idRol = $idRol;
        }

        function setStrNombre($strNombre) {
            $this->strNombre = $strNombre;
        }
        /* estas funciones por el momento no funcan
        function conectarBD(){
            return include('./conexion.php');
        }
        
        function cerrarConexionBD(){
            include('./desconexion.php');
        }*/
        
        function getRolByID($id_rol){
            include './conexion.php';

            $stmt = $conn->prepare("SELECT id_rol, nombre FROM rol WHERE id_rol=:id_rol");
            $stmt->bindParam(':id_rol', $id_rol);
            
            $stmt->execute();
            
            $result = $stmt->fetch();
            
            return $result;
        }
        
        function getRolByName($nomb){
            include './conexion.php';

            $stmt = $conn->prepare("SELECT id_rol, nombre FROM rol WHERE nombre LIKE ?");
            $stmt->bindValue(1,"%{$nomb}%", PDO::PARAM_STR);
   
           
            $stmt->execute();
            
            $result = $stmt->fetchAll();
            
            return $result;
        }
        
        
        function getRol(){
            
            include('conexion.php');
            
            $sql = 'SELECT id_rol, nombre FROM rol';
            //$statmt = $conn->prepare($sql); con esta funcion no me funciona...
            $result = $conn->query($sql);
            // Extraer los valores de $result
            $filas = $result->fetchAll();
            
            return $filas; // retornamos los valores
            
        }
        
    }
 
?>

