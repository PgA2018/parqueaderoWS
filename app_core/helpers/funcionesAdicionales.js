
var padnum= function(num, size){
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
};

var formatearFecha= function(fechaparam, hora){
    if(fechaparam){

        var fecha= new Date(fechaparam);

        if(hora){
            var mes= padnum(parseInt(fecha.getMonth())+1,2);
            var dia= padnum(parseInt(fecha.getDate()),2);
            var hora=padnum(parseInt(fecha.getHours()),2);
            var minuto=padnum(parseInt(fecha.getMinutes()),2);
            var cadena=dia+"/"+mes+"/"+ fecha.getFullYear()+" "+hora+":"+minuto;

        }
        else{
            var mes= padnum(parseInt(fecha.getMonth())+1,2);
            var dia= padnum(parseInt(fecha.getDate()),2);
            var cadena=dia+"/"+mes+"/"+ fecha.getFullYear();
        }
        return cadena;
    }
    else{
        return "";
    }
};

var buscarObjetoByKey= function(arreglo, identificador, valor){
    var objetoEncontrado={};
    arreglo.forEach(function(item){
        if(item[identificador]==valor){
            objetoEncontrado=item;
            return;
        }
    });
    return objetoEncontrado;
};


var digitoVerificacionNit= function(documento){

      var arreglo, x, y, z, i, dv;
     
      if (isNaN(documento)){
            dv=null;
      } 
      else {
            arreglo = new Array(16); 
            x=0 ; 
            y=0 ; 
            z=documento.length;
            arreglo=[0,3,7,13,17,19,23,29,37,41,43,47,53,59,67,71];
    
            for(i=0; i<z; i++)
            { 
                y=(documento.substr(i,1));
                x+=(y*arreglo[z-i]);
            } 
            y=x%11;
            if (y > 1){ 
                dv=11-y; 
            } 
            else { 
                dv=y; 
            }
      
      }
      
      return dv;
    
}

module.exports.padnum=padnum;
module.exports.buscarObjetoByKey=buscarObjetoByKey;
module.exports.formatearFecha=formatearFecha;
module.exports.digitoVerificacionNit=digitoVerificacionNit;

