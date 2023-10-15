const bcrypt = require('bcrypt');
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      unique: true
    },

    password: {
      type: DataTypes.STRING,
    },

    email: { 
      type: DataTypes.STRING,
      unique: true 
    },

    created_at: { type: DataTypes.DATE,
      defaultValue: sequelize.literal('NOW()')
    },

    role: {
      type: DataTypes.STRING,
      defaultValue: 'user'
    },
    
    owner_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 5);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          user.password = await bcrypt.hash(user.password, 5);
        }
      }
    }
  });
  return User;
};