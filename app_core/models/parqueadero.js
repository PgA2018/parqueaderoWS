/*jshintindent:2*/module.exports=function(sequelize,
DataTypes)
{
return sequelize.define('Parqueadero',

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
tableName:'parqueadero',
timestamps: false,
underscored: true,
freezeTableName: true,
schema:'public',
classMethods: 
{
associate: function(models) 
{
models.Parqueadero.hasMany(models.Sucursal,
 
{
foreignKey:'id_parqueadero'
}
)
;
models.Parqueadero.hasMany(models.Usuario,
 
{
foreignKey:'id_parqueadero'
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
