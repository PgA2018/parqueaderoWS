
module.exports=function(sequelize,
DataTypes)
{
return sequelize.define('Usuario',

{
id:
{
type:DataTypes.INTEGER,

autoIncrement: true,

allowNull:false,
primaryKey:true
}
,
nombre:
{
type:DataTypes.STRING,
allowNull:false
}
,
identificacion:
{
type:DataTypes.STRING,
allowNull:false
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
password:
{
type:DataTypes.STRING,
allowNull:false
}
,
tipo_usuario:
{
type:DataTypes.INTEGER,
allowNull:false/* JARR */
}
,
id_parqueadero:
{
type:DataTypes.INTEGER,
allowNull:false/* JARR */
}

}
,

{
tableName:'usuario',
timestamps: false,
underscored: true,
freezeTableName: true,
schema:'public',
classMethods: 
{
associate: function(models) 
{
models.Usuario.belongsTo(models.TipoUsuario,
 
{
foreignKey:'tipo_usuario'
}
)
;
models.Usuario.belongsTo(models.Parqueadero,
 
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
