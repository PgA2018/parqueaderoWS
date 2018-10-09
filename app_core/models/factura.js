module.exports = function(sequelize,
    DataTypes) {
    return sequelize.define('Factura',

        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            num_fac: {
                type: DataTypes.STRING,
                allowNull: false
            },
            fec_entrada: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },
            valor: {
                type: DataTypes.REAL,
                allowNull: false
            },
            placa_vehiculo: {
                type: DataTypes.STRING,
                allowNull: false
            },
            id_plaza: {
                type: DataTypes.INTEGER,
                allowNull: false /* JARR */
            },
            fec_salida: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },
            id_estado_fac: {
                type: DataTypes.INTEGER,
                allowNull: false /* JARR */
            }

        },

        {
            tableName: 'factura',
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            schema: 'public',
            classMethods: {
                associate: function(models) {
                    models.Factura.belongsTo(models.Plazas,

                        {
                            foreignKey: 'id_plaza'
                        }
                    );
                    models.Factura.belongsTo(models.EstadoFactura,

                        {
                            foreignKey: 'id_estado_fac'
                        }
                    );

                }

            }

        }
    );

}

;

