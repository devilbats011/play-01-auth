'use strict'

const Password = require('../../services/password')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
      },
      googleId: {
        type: DataTypes.STRING,
      },
      facebookId: {
        type: DataTypes.STRING,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      paranoid: true,
    }
  )
  User.associate = function (models) {
    // associations can be defined here
  }

  User.beforeCreate(async (user, options) => {
    if (user.password) {
      const hashedPassword = await Password.toHash(user.password)
      user.password = hashedPassword
    }
  })

  User.prototype.toJSON = function () {
    var values = Object.assign({}, this.get())

    delete values.password
    return values
  }

  return User
}
