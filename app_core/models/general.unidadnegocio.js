'use strict';
module.exports = function(sequelize, DataTypes) {
    var UnidadNegocio = sequelize.define('UnidadNegocio', {
        id_unidad_negocio: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nom_unidad_negocio: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
    }, {
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        tableName: 'unidadnegocio',
        schema: 'general',
        classMethods: {
            associate: function(models) {
                //models.Jurado.hasMany(models.Unidad,{'foreignKey':'id_unidad_negocio'});
            }
        }
    });
    return UnidadNegocio;
};