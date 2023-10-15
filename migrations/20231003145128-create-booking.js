'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      serviceId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Services', // Name of the target table
          key: 'id',         // Key in the target table that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      availabilityId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Availabilities',
          key: 'id'
        },
        allowNull: false
      },
      
      booking_date: {
        type: Sequelize.DATE
      },
      booking_time: {
        type: Sequelize.TIME
      },
      status: {
        type: Sequelize.STRING
      },
      created_at: {
        type: Sequelize.DATE
      },
      owner_id: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Bookings');
  }
};