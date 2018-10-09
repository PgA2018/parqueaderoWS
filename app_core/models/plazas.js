module.exports = function(sequelize,
    DataTypes) {
    return sequelize.define('Plazas', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        llave: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        techo: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        id_sucursal: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        disponible: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        id_vehiculo: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        tableName: 'plazas',
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        schema: 'public',
        classMethods: {
            associate: function(models) {
                models.Plazas.belongsTo(models.Sucursal, {
                    foreignKey: 'id_sucursal'
                });
                models.Plazas.belongsTo(models.TipoVehiculo, {
                    foreignKey: 'id_vehiculo'
                });
                models.Plazas.hasMany(models.Factura, {
                    foreignKey: 'id_plaza'
                });
            }
        }
    });
};