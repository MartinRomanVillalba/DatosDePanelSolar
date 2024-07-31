"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Datos_Panels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Datos_Panels.belongsTo(models.Horas,{
        as: 'hora',
        foreignKey: 'hora_id'
      })
    }
  }
  Datos_Panels.init(
    {
      output: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      output_active: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      voltaje: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      porcentaje: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      charging: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      discharge: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      input_voltaje: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      input_power: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      horas_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Datos_Panels",
    }
  );
  return Datos_Panels;
};
