var Models=require("../../app_core/models/index");
var sequelize = Models.sequelize;
var Q = require("q");

var incrementarSecuencia= function(nombre){

	var deferred= Q.defer();
	return sequelize.transaction({autocommit:false}).then(function(t){
		
		Models.Secuencia.find({
      		where:{
          		nombre_secuencia:nombre
      		}
  		},{transaction:t}).then(function(secuencia){
  			secuencia.updateAttributes({
  				consecutivo:secuencia.consecutivo+1
  			},{transaction:t}).then(function(nuevasecuencia){
  				deferred.resolve({transaccion:t,secuencia:nuevasecuencia});
  			}).catch(function(error){
  				t.rollback();
  				deferred.reject("error");
  			});
  		}).catch(function(error){
  			t.rollback();
  			deferred.reject("error");
  		});
  		return deferred.promise;
	});
};

module.exports.incrementarSecuencia=incrementarSecuencia;