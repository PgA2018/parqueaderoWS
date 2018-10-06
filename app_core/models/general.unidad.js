'use strict';
module.exports = function(sequelize, DataTypes) {
    var Unidad = sequelize.define('Unidad', {
        codigo_unidad:{
            type: DataTypes.STRING(10),
            primaryKey: true,
            allowNull: false
        },
        nombre_unidad:{
            type: DataTypes.STRING(50),
            allowNull: false
        },
        detalle_unidad:{
           type: DataTypes.STRING(100),
           allowNull: false
        },
        estado_unidad:{
           type: DataTypes.CHAR(1),
           allowNull: false
        },
        nivel_dependencia:{
           type: DataTypes.INTEGER,
           allowNull: false
        },
        esfondo_unidad:{
           type: DataTypes.CHAR(1),
           allowNull: false
        },
        sede_central_unidad:{
           type: DataTypes.CHAR(1),
           allowNull: false
        },
        descentralizada_unidad:{
           type: DataTypes.CHAR(1),
           allowNull: false
        },
        tipo_unidad_id:{
           type: DataTypes.INTEGER,
           allowNull: true
        },
        unidad_negocio_id:{
           type: DataTypes.INTEGER,
           allowNull: true
        },
        unidad_padre_id:{
           type: DataTypes.STRING(10),
           allowNull: true
        },
    }, {
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        schema:'general',
        tableName: 'unidad',
        classMethods: {
            associate: function(models) {
                 models.Unidad.belongsTo(models.UnidadNegocio,{'foreignKey':'unidad_negocio_id'});
            }
        }
    });
    return Unidad;
};