/*jshintindent:2*/module.exports=function(sequelize,
DataTypes)
{
return sequelize.define('TipoUsuario',

{
id:
{
type:DataTypes.INTEGER,
allowNull:false,
primaryKey:true
}
,
nombre:
{
type:DataTypes.STRING,
allowNull:true
}

}
,

{
tableName:'tipo_usuario',
timestamps: false,
underscored: true,
freezeTableName: true,
schema:'public',
classMethods: 
{
associate: function(models) 
{
models.TipoUsuario.hasMany(models.Usuario,
 
{
foreignKey:'tipo_usuario'
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
