'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'refresh_token', {
      type : Sequelize.STRING,
      defaultValue : null
    });
    await queryInterface.addColumn('users', 'refresh_token_version', {
      type : Sequelize.INTEGER,
      defaultValue : null
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'refresh_token');
    await queryInterface.removeColumn('users', 'refresh_token_version');
  }
};
