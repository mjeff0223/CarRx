'use strict';

/** @type {import('sequelize-cli').Migration} */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('ServiceProviders', 'role', {
      type: Sequelize.STRING,
      defaultValue: 'serviceProvider'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('ServiceProviders', 'role');
  }
};

