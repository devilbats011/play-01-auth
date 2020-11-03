'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'phoneNumber', {
      type: Sequelize.STRING,
      defaultValue: null,
      after: 'password',
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'phoneNumber')
  },
}
