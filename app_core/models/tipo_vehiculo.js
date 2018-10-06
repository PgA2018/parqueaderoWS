/*jshintindent:2*/module.exports=function(sequelize,
DataTypes)
{
return sequelize.define('TipoVehiculo',

{
id:
{
type:DataTypes.INTEGER,
allowNull:false,
primaryKey:true,
autoIncrement:true
}
,
nombre:
{
type:DataTypes.STRING,
allowNull:true
}
,
precio:
{
type:DataTypes.REAL,
allowNull:true
}

}
,

{
tableName:'tipo_vehiculo',
timestamps: false,
underscored: true,
freezeTableName: true,
schema:'public',
classMethods: 
{
associate: function(models) 
{
models.TipoVehiculo.hasMany(models.Plazas,
 
{
foreignKey:'id_vehiculo'
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
