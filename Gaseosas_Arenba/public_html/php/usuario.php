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
        
        function existUserByName($nombreUser){
            include('./conexion.php');
            
            $sql = 'SELECT usuario FROM usuario WHERE usuario=:user';
            $statm = $conn->prepare($sql);
            $statm->bindParam(':user',$nombreUser,PDO::PARAM_STR);
            //$statmt = $conn->prepare($sql); con esta funcion no me funciona...
            $result = $statm->execute();
            // Extraer los valores de $result
            //$filas = $result->fetchAll();
            
            if($statm->rowCount($result) > 0){
                return $result; // retornamos los valores
            }
        }
             
        function getUsuarioByID($iduso){
            include './conexion.php';

            $stmt = $conn->prepare("SELECT id_usuario, usuario, id_rol, nombre, apellido, estado FROM usuario WHERE id_usuario=:id_usuario");
            $stmt->bindParam(':id_usuario', $iduso,PDO::PARAM_INT);
            
            $stmt->execute();
            
            $result = $stmt->fetch();
            
            return $result;
        }
        
        function getUsuarioByName($nomb){
            include './conexion.php';

            $stmt = $conn->prepare("SELECT usuario, R.nombre as 'id_rol', U.nombre, U.apellido, U.estado, U.id_usuario as 'id_usuario' FROM usuario U INNER JOIN rol R ON U.id_rol=R.id_rol WHERE U.nombre LIKE ?");
            $stmt->bindValue(1,"%{$nomb}%", PDO::PARAM_STR);
    
            $stmt->execute();
            
            $result = $stmt->fetchAll();
            
            return $result;
        }
        
         
        function getUsuarioByNameOrRol($nomb,$rol){
            include './conexion.php';

            $stmt = $conn->prepare("SELECT usuario, R.nombre as 'id_rol', U.nombre, U.apellido, U.estado FROM usuario U INNER JOIN rol R ON U.id_rol=R.id_rol WHERE U.nombre LIKE ?");
            $stmt->bindValue(1,"%{$nomb}%", PDO::PARAM_STR);
            $stmt->bindParam(':rol',$rol,PDO::PARAM_STR);
   
           
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

                $sql = 'SELECT id_usuario, usuario, password, id_rol, nombre, apellido, estado FROM usuario WHERE usuario=:user AND password=:pass';
                $stmt=$conn->prepare($sql);
                $stmt->bindParam(':user', $user);
                $stmt->bindParam(':pass', $pass);
                //$statmt = $conn->prepare($sql); con esta funcion no me funciona...
                $stmt->execute();
                $result = $stmt->fetchAll();
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
            $stmt = $conn->query("SELECT LAST_INSERT_ID()"); // para poder retornar el ultimo id generado
            $lastId = $stmt->fetchColumn();
            $ultimoId = $lastId;
            echo $ultimoId;
            
            
            // realizamos la desconexion de la BD
            include('desconexion.php');
            
        }
        
        function updateNombreYApellidoUsuario($idUsr,$nbre,$aido){
            include('./conexion.php');
            /*$row = [
                'id' => $idUsr,
                'nombre' => $nbre,
                'apellido' => $aido
            ];
            $sql = "UPDATE usuario SET nombre=:nombre, apellido=:apellido WHERE id_usuario=:id;";
            $status = $conn->prepare($sql)->execute($row);*/
            try{
                $sql = "UPDATE `usuario` SET `nombre`=:nombre,  
			`apellido`=:apellido
			WHERE `id_usuario`=:idusr";
                $stamt = $conn->prepare($sql);                                  
                $stamt->bindParam(':nombre', $nbre, PDO::PARAM_STR);
                $stamt->bindParam(':apellido', $aido, PDO::PARAM_STR);
                $stamt->bindParam(':idusr', $idUsr, PDO::PARAM_STR);
                $stamt->execute();
                return $idUsr;
            }catch( PDOExecption $e ) { 
                print "Error!: " . $e->getMessage() . "</br>"; 
            }
            // realizamos la desconexion de la BD
            include('./desconexion.php');
        }
        
        function updateUsuario($id,$usio,$nombe,$aellido,$password){
            
            $pass = md5($password);
            echo($password);
            include('./conexion.php');

            try{
                $sql = "UPDATE `usuario` SET `usuario`=:usuario,`nombre`=:nombre,`apellido`=:apellido,`password`=:password WHERE `id_usuario`=:idusr";
                $stamt = $conn->prepare($sql);
                $stamt->bindParam(':usuario', $usio, PDO::PARAM_STR);
                $stamt->bindParam(':nombre', $nombe, PDO::PARAM_STR);
                $stamt->bindParam(':apellido', $aellido, PDO::PARAM_STR);
                $stamt->bindParam(':password', $pass, PDO::PARAM_STR);
                $stamt->bindParam(':idusr', $id, PDO::PARAM_INT);
                $stamt->execute();
                return $id;
            }catch( PDOExecption $e ) { 
                print "Error!: " . $e->getMessage() . "</br>"; 
            }
            // realizamos la desconexion de la BD
            include('./desconexion.php');
        }
        
    }
 
?>

