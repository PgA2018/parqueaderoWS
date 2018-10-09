/*jshintindent:2*/module.exports=function(sequelize,
DataTypes)
{
return sequelize.define('EstadoFactura',

{
id:
{
type:DataTypes.INTEGER,
allowNull:false,
autoIncrement: true,
primaryKey:true
}
,
nombre:
{
type:DataTypes.STRING,
allowNull:false
}

}
,

{
tableName:'estado_factura',
timestamps: false,
underscored: true,
freezeTableName: true,
schema:'public',
classMethods: 
{
associate: function(models) 
{
models.EstadoFactura.hasMany(models.Factura,
 
{
foreignKey:'id_estado_fac'
}
)
;

}

}

}
)
;

}

;
