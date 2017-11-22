<?php

    class Cliente{
        private $nombre;
        private $apellido;
        private $dni;
        private $telefono;
        private $email;
        private $provincia;
        private $localidad;
        private $direccion;
        private $idUsuario;
        private $idPassword;
        private $estado;
        private $rol;
        private $puntos;
        private $intentos;
        private $token;
        private $validacion;
               
        function __construct(){
            $this->nombre = "";
            $this->apellido = "";
            $this->dni = 0;
            $this->telefono = 0;
            $this->email = 0;
            $this->provincia = "";
            $this->localidad = "";
            $this->direccion = "";
            $this->idUsuario = "";
            $this->idPassword = "";
            $this->estado = 0;
            $this->rol = 0;
            $this->puntos = 0;
            $this->intentos = 0;
            $this->token = 0;
            $this->validacion = 0;
        }
     
        function getNombre() {
            return $this->nombre;
        }

        function getApellido() {
            return $this->apellido;
        }

        function getDni() {
            return $this->dni;
        }

        function getTelefono() {
            return $this->telefono;
        }

        function getImail() {
            return $this->email;
        }

        function getProvincia() {
            return $this->provincia;
        }
        
        function getLocalidad() {
            return $this->localidad;
        }
        
        function getDireccion() {
            return $this->direccion;
        }
        
        function getIdUsuario() {
            return $this->idUsuario;
        }
        
        function getIdPassword() {
            return $this->idPassword;
        }
        
        function getEstado() {
            return $this->estado;
        }
        
        function getRol() {
            return $this->rol;
        }
        
        function getPuntos() {
            return $this->puntos;
        }
        
        function getIntentos() {
            return $this->intentos;
        }
        
        function getToken() {
            return $this->token;
        }
        
        function getValidacion() {
            return $this->validacion;
        }
        
        function setNombre($nombre) {
            $this->idProducto = $nombre;
        }

        function setApellido($apellido) {
            $this->strNombreProducto = $apellido;
        }

        function setDni($dni) {
            $this->strDescripcionProducto = $dni;
        }

        function setTelefono($telefono) {
            $this->strFoto = $telefono;
        }

        function setEmail($email) {
            $this->intPuntosCanje = $email;
        }

        function setProvincia($provincia) {
            $this->boolEstado = $provincia;
        }
        
        function setLocalidad($localidad) {
            $this->boolEstado = $localidad;
        }
        
        function setDireccion($direccion) {
            $this->boolEstado = $direccion;
        }
        
        function setIdUsuario($idUsuario) {
            $this->boolEstado = $idUsuario;
        }
        
        function setIdPassword($idPassword) {
            $this->boolEstado = $idPassword;
        }
        
        function setEstado($estado) {
            $this->boolEstado = $estado;
        }
        
        function setRol($rol) {
            $this->boolEstado = $rol;
        }
        
        function setPuntos($puntos) {
            $this->boolEstado = $puntos;
        }
        
        function setIntentos($intentos) {
            $this->boolEstado = $intentos;
        }
        
        /* estas funciones por el momento no funcan
        function conectarBD(){
            return include('./conexion.php');
        }
        
        function cerrarConexionBD(){
            include('./desconexion.php');
        }*/
        
        function getPuntosDeUsuario($idUsu){
            include ('./conexion.php');
            try{
                $stmt = $conn->prepare("SELECT puntos FROM cliente WHERE id_usuario=:id_usuario");
                $stmt->bindParam(':id_usuario',$idUsu,PDO::PARAM_INT);

                $stmt->execute();

                $result = $stmt->fetch();
                $punt = (int)$result['puntos'];
                //print('<script>alert("hola");</script>');
                return $punt;
            }catch( PDOExecption $e ) { 
                print "Error!: " . $e->getMessage() . "</br>"; 
            }
            // realizamos la desconexion de la BD
            include ('./desconexion.php');
        }
        
        function sumarPuntosCanje($idUsu){
            include ('./conexion.php');
            try{
                $stmt = $conn->prepare("SELECT puntos FROM cliente WHERE id_usuario=:id_usuario");
                $stmt->bindParam(':id_usuario',$idUsu,PDO::PARAM_INT);

                $stmt->execute();

                $result = $stmt->fetch();
                $punt = (int)$result['puntos'];
                //print('<script>alert("hola");</script>');
                $puntActualizados = $punt + 10;
                $this->actualizarPuntos($idUsu,$puntActualizados);
                return $punt;
            }catch( PDOExecption $e ) { 
                print "Error!: " . $e->getMessage() . "</br>"; 
            }
            // realizamos la desconexion de la BD
            include ('./desconexion.php');
        }
        
        function actualizarPuntos($idUsu,$intPuntos){
            include('./conexion.php');
            try{
                $sql = "UPDATE cliente SET puntos=:puntos WHERE id_usuario=:id_usuario";
                $stmt = $conn->prepare($sql);                           
                $stmt->bindParam(':puntos',$intPuntos,PDO::PARAM_INT);
                $stmt->bindParam(':id_usuario',$idUsu, PDO::PARAM_INT);
                $stmt->execute();
            }catch( PDOExecption $e ) { 
                print "Error!: " . $e->getMessage() . "</br>"; 
            }
            // realizamos la desconexion de la BD
            include('./desconexion.php');
        }
        
        function getProductoByID($id_producto){
            include './conexion.php';

            $stmt = $conn->prepare("SELECT id_producto, nombre, descripcion, foto, puntos, estado FROM producto WHERE id_producto=:id_producto");
            $stmt->bindParam(':id_producto', $id_producto);
            
            $stmt->execute();
            
            $result = $stmt->fetch();
            
            
            return $result;
        }
        
        function getProductosByNameOrDescript($nomb){
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
        
        function insertar($idUsuario,$idPassword,$nombre,$apellido,$rol){
           
            // realizamos la conexion
            include('conexion.php');

            $ultimoId;
            //ejecutamos el insert
            //$statmt->execute();
            try{
                //preparamos la consulta insert
                $statmt = $conn->prepare("INSERT INTO `usuario`(`usuario`,`password`, `nombre`, `apellido`, `id_rol`) VALUES ('$idUsuario','$idPassword','$nombre','$apellido','$rol')");
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

