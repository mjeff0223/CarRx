'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ServiceProvider extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // ... other associations ...
      this.hasMany(models.Availability, {
        foreignKey: 'serviceProviderId',
        as: 'availabilities'
      });
    }
    
  }
  ServiceProvider.init({
    company_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    created_at: { type: DataTypes.DATE,
      defaultValue: sequelize.literal('NOW()')
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'serviceProvider'
    },
    
    owner_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ServiceProvider',
  });
  return ServiceProvider;
};