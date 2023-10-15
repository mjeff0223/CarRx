'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association with User model
      this.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });

      // Define association with Service model
      this.belongsTo(models.Service, {
        foreignKey: 'serviceId',
        as: 'service'
      });

      this.belongsTo(models.Availability, {
        foreignKey: 'availabilityId',
        as: 'availability'
      })
    }
  }
  Booking.init({
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users', // Name of the User model table
        key: 'id'
      }
    },
    serviceId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Services', // Name of the Service model table
        key: 'id'
      }
    },
    booking_date: DataTypes.DATE,
    booking_time: DataTypes.TIME,
    status: DataTypes.STRING,
    created_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('NOW()')
    },
    owner_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
