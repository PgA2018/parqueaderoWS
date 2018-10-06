'use strict';
module.exports = function(sequelize, DataTypes) {
  var Secuencia = sequelize.define('Secuencia', {
    id_secuencia:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    nombre_secuencia: {
      type:DataTypes.STRING,
      allowNull: false
    },
    consecutivo: {
      type:DataTypes.INTEGER,
      allowNull: false
    }

  }, {
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    tableName: 'secuencias',
    classMethods: {
      associate: function(models) {
        
      }
    }
  });
  return Secuencia;
};