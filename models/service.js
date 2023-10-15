'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.ServiceProvider, {
        foreignKey: 'providerId',
        as: 'provider'
      });

      


    }
    
  }
  Service.init({
    service_name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL(10,2),
    duration: DataTypes.INTEGER,
    providerId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'ServiceProviders', // Name of the ServiceProvider model table
        key: 'id'
      }
    },
    
    created_at: DataTypes.DATE,
    owner_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Service',
  });
  return Service;
};