'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
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
      this.belongsTo(models.Booking, {
        foreignKey: 'bookingId',
        as: 'booking'
      });
    }
    
  }
  Payment.init({
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    bookingId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Bookings',
        key: 'id'
      }
    }
    ,
    amount: DataTypes.DECIMAL(10,2),
    payment_status: DataTypes.STRING,
    created_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('NOW()')
    },
    owner_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};