'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Availability extends Model {
    static associate(models) {
      this.belongsTo(models.ServiceProvider, {
        foreignKey: 'serviceProviderId',
        as: 'serviceProvider'
      });
      this.hasOne(models.Booking, {
        foreignKey : 'availabilityId',
        as: 'booking'
      })
    }
  }
  Availability.init({
    serviceProviderId: DataTypes.INTEGER,
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE,
    isBooked:  {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Availability',
  });
  return Availability;
};
