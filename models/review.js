'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
      this.belongsTo(models.ServiceProvider, {
        foreignKey: 'serviceProviderId',
        as: 'serviceProvider'
      });
    }
    
  }
  Review.init({
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    serviceProviderId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'ServiceProviders',
        key: 'id'
      }
    }
    ,
    rating: { 
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 5
      }
    },
    comment: DataTypes.TEXT,
    created_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('NOW()')
    },
    owner_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};