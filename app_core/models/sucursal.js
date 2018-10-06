/*jshintindent:2*/module.exports=function(sequelize,
DataTypes)
{
return sequelize.define('Sucursal',

{
id:
{
type:DataTypes.INTEGER,
allowNull:false,
primaryKey:true
}
,
id_parqueadero:
{
type:DataTypes.INTEGER,
allowNull:false/* JARR */
}
,
direccion:
{
type:DataTypes.TEXT,
allowNull:false
}
,
telefono:
{
type:DataTypes.STRING,
allowNull:false
}
,
descripcion:
{
type:DataTypes.TEXT,
allowNull:false
}

}
,

{
tableName:'sucursal',
timestamps: false,
underscored: true,
freezeTableName: true,
schema:'public',
classMethods: 
{
associate: function(models) 
{
models.Sucursal.belongsTo(models.Parqueadero,
 
{
foreignKey:'id_parqueadero'
}
)
;
models.Sucursal.hasMany(models.Plazas,
 
{
foreignKey:'id_sucursal'
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
