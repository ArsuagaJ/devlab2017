 <?php
                    session_start();
                    //include 'serv.php';
                    if(isset($_SESSION['user'])){
                    echo '<script> window.location="../php/validar.php"; </script>';
                    }
                ?>
<!DOCTYPE HTML>

<html>

	<head>            
		<title>Gaseosas Arenba</title>
		<!-- -->
                
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="stylesheet" href="../bootstrap/bootstrap.min.css">
                <script type="text/javascript" src="../bootstrap/jquery-3.2.1.js"></script>
                <script type="text/javascript" src="../bootstrap/jquery.min.js"></script>
                <script type="text/javascript" src="../bootstrap/bootstrap.min.js"></script>
                <!--<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">-->
		<!--<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>-->
		<!--<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>-->
		<link rel=stylesheet href="../css/style.css">
		
	</head>
        <body class="bodyIndex">
           
            
<nav class="navbar navbar-inverse">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>                        
      </button>
      <a class="navbar-brand" href="#">Gaseosa Arenba</a>
    </div>
    <div class="collapse navbar-collapse" id="myNavbar">
      <ul class="nav navbar-nav navbar-right">
        <li><a href="usuario_registro.html"><span class="glyphicon glyphicon-user"></span> Registrate</a></li>
      </ul>
    </div>
  </div>
</nav>
	

<!--<form id="formulario" class="form-horizontal" role="form">-->
  <div class="row">
    <div class="Absolute-Center is-Responsive">
      <div class="col-sm-12 col-md-10 col-md-offset-1">
        <form id="loginForm" methop="post" action="../php/validar.php" >
          <div class="form-group input-group">
            <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
            <input class="form-control" type="text" name='usuario' id="idUsuario" placeholder="usuario"/>
			<div id="mensaje1" class="oculto">El campo usuario se encuentra vacio</div>			
          </div>
          <div class="form-group input-group">
            <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
            <input class="form-control" type="password" name='password' id="idPassword" placeholder="password"/>
			<div id="mensaje2" class="oculto">El campo password se encuntra vacio o es incorrecto</div>		
          </div>
          <div class="form-group">
            <button type="submit" name="login" class="btn btn-def btn-block">Ingresar</button>
          </div>
        </form>        
      </div>  
    </div>    
  </div>

            

</html>

