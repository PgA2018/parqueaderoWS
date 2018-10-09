'use strict';
module.exports = function(sequelize, DataTypes) {
    var Compra = sequelize.define('Compra', {
        id_compra: {
            type: DataTypes.DOUBLE,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        observacion: {
            type: DataTypes.STRING(100),
            allowNull: true,
            set: function(val) {
                if (val) {
                    this.setDataValue('observacion', val.toUpperCase());
                }
            }
        },
        fecha_compra: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.NOW
        },
        id_usuario: {
            type: DataTypes.DOUBLE,
            allowNull: false
        }
    }, {
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        tableName: 'compra',
        classMethods: {
            associate: function(models) {}
        }
    });
    return Compra;
};