'use strict';

/** @type {import('sequelize-cli').Migration} */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add the unique constraint
    await queryInterface.addConstraint('Users', {
      fields: ['email'],
      type: 'unique',
      name: 'unique_email_constraint'
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the unique constraint
    await queryInterface.removeConstraint('Users', 'unique_email_constraint');
  }
};

