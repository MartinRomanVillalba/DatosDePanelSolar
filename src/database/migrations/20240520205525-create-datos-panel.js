'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('datos_panel', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      output: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      output_active: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      voltaje: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      porcentaje: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      charging: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      discharge: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      input_voltaje: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      input_power: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      fechas_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'fechas'
          },
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('datos_panel');
  }
};