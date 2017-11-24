$(document).ready(function(){
    $.ajax({
       type : "get",
       url :"../php/getProductosActivos.php"
    }).done(function(productos){
        console.log(productos);
        var largo = Object.keys(productos).length;
        //var largo = productos.length;
        var m = [];
        var ids = [];
        for(var y=1; y < largo; y++){
            m.push(productos[y].foto);
            ids.push(productos[y].id);
        }
        console.log(m);
        //var m = ["../imgs/botella_agua11.png","../imgs/botella_cola.png","../imgs/botella_lima.png","../imgs/botella_naranja1.png","../imgs/botellaww.png","../imgs/gaseosas.jpg","../imgs/img1.jpg","../imgs/img2.png"]
        for(var i=0 ; i< m.length ; i++) {
            $('<div class="item" id="item'+ids[i]+'"><img src="'+m[i]+'"><div class="carousel-caption"></div>   </div>').appendTo('.carousel-inner');
            $('<li data-target="#carousel-example-generic" data-slide-to="'+i+'"></li>').appendTo('.carousel-indicators');
        }
        $('.item').first().addClass('active');
        $('.carousel-indicators > li').first().addClass('active');
        $('#carousel-example-generic').carousel(); 
    });
    
    $('div #item').change(function(){
        alert("hola");
    });
});