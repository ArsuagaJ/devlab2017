function pad(input, length, padding) { 
  var str = input + "";
  return (length <= str.length) ? str : pad(padding+str, length, padding);
}

function noEsUnNumero(param){
    if(isNaN(param)){
        return 1;
    }
    return 0;
}

function fechaActual(){
    var fecha = new Date();
    var dia = fecha.getDate();
    var mes = fecha.getMonth()+1;
    var anio = fecha.getFullYear();
    var fec = anio+"-"+pad(mes,2,"0")+"-"+pad(dia,2,"0");
    return fec;
}

function setFechaActual(objeto){
    //var fechaIncidente = objeto.attr("min",;
    var strFechaActual=fechaActual();
    objeto.attr("min",strFechaActual);
    objeto.attr("value",strFechaActual);
    //console.log("fechas");
}

function validarFechaMayorActual(fecha){
    var split = fecha.split("-"); // dividimos el string de fechas por guiones (como viene del browser)
    if(split.length != 3){ // si no tiene unicamente 3 partes, decimos que es falso
        console.log("no se ingreso una fecha de la forma correcta");
        return false;
    }else{
        var hoy = new Date(); // instanciamos un nuevo objeto DATE con la fecha de hoy para hacer las comparaciones
	var stringFecha = split[0]+"/"+split[1]+"/"+split[2]; // armamos el string para generar un nuevo objeto DATE para comparar fecha mayor a actual
        //var stringFecha = split[2]+"/"+split[1]+"/"+split[0];
        //console.log("tipo string?: "+typeof(stringFecha));
        var fechaIngresada = new Date(stringFecha);
        // Comparamos solo las fechas => no las horas!!
        hoy.setHours(0,0,0,0);  // Lo iniciamos a 00:00 horas

        if (hoy <= fechaIngresada) {
            console.log("0k, se valido correctamente");
          return true;
        }
        else {
          console.log("Error de ingreso de fechas");
        }
    }
    return false;
}

/*function validaFechaMayorActual(fecha){
    var actual = getFechaActual();
    var actSplit = actual.split("/");
    var fecSplit = fecha.split("/")
}*/

function validaFechaDDMMAAAA(fecha){ //se que funciona de la web
	var dtCh= "/";
	var minYear=1900;
	var maxYear=2100;
	function isInteger(s){
		var i;
		for (i = 0; i < s.length; i++){
			var c = s.charAt(i);
			if (((c < "0") || (c > "9"))) return false;
		}
		return true;
	}
	function stripCharsInBag(s, bag){
		var i;
		var returnString = "";
		for (i = 0; i < s.length; i++){
			var c = s.charAt(i);
			if (bag.indexOf(c) == -1) returnString += c;
		}
		return returnString;
	}
	function daysInFebruary (year){
		return (((year % 4 == 0) && ( (!(year % 100 == 0)) || (year % 400 == 0))) ? 29 : 28 );
	}
	function DaysArray(n) {
		for (var i = 1; i <= n; i++) {
			this[i] = 31
			if (i==4 || i==6 || i==9 || i==11) {this[i] = 30}
			if (i==2) {this[i] = 29}
		}
		return this
	}
	function isDate(dtStr){
		var daysInMonth = DaysArray(12)
		var pos1=dtStr.indexOf(dtCh)
		var pos2=dtStr.indexOf(dtCh,pos1+1)
		var strDay=dtStr.substring(0,pos1)
		var strMonth=dtStr.substring(pos1+1,pos2)
		var strYear=dtStr.substring(pos2+1)
		strYr=strYear
		if (strDay.charAt(0)=="0" && strDay.length>1) strDay=strDay.substring(1)
		if (strMonth.charAt(0)=="0" && strMonth.length>1) strMonth=strMonth.substring(1)
		for (var i = 1; i <= 3; i++) {
			if (strYr.charAt(0)=="0" && strYr.length>1) strYr=strYr.substring(1)
		}
		month=parseInt(strMonth)
		day=parseInt(strDay)
		year=parseInt(strYr)
		if (pos1==-1 || pos2==-1){
			return false
		}
		if (strMonth.length<1 || month<1 || month>12){
			return false
		}
		if (strDay.length<1 || day<1 || day>31 || (month==2 && day>daysInFebruary(year)) || day > daysInMonth[month]){
			return false
		}
		if (strYear.length != 4 || year==0 || year<minYear || year>maxYear){
			return false
		}
		if (dtStr.indexOf(dtCh,pos2+1)!=-1 || isInteger(stripCharsInBag(dtStr, dtCh))==false){
			return false
		}
		return true
	}
	if(isDate(fecha)){
		return true;
	}else{
		return false;
	}
}