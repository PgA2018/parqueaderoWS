var Models=require("../models/index");
var sequelize = Models.sequelize;

var queries={
    "Compra":{
        "darCompraCompleta":"SELECT * FROM compra c JOIN detalle_compra dc ON c.id_compra=dc.id_compra"
    }
};

var findAll=function(){
    return Models.Compra.findAll({});
};

var findById=function(identificador){
    return Models.Compra.find({
        where:{
            id_compra:identificador
        }
    });
};

var create= function(compra){
  return  Models.Compra.create({
       fecha_compra:compra.fecha_compra,
       observacion:compra.observacion
  });
};

var darCompraCompleta=function(){
     return sequelize.query(queries.Compra.darCompraCompleta);
};

var deleteById=function(identificador){
    return Models.Compra.destroy({
         where:{
             id_compra:identificador
         }
    });
};


module.exports.findAll= findAll;
module.exports.findById= findById;
module.exports.create= create;
module.exports.deleteById=deleteById;
module.exports.darCompraCompleta=darCompraCompleta;
