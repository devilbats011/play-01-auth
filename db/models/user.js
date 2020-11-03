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
      phoneNumber: {
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
    delete values.googleId
    delete values.facebookId
    delete values.isActive
    delete values.deletedAt
    return values
  }

  return User
}

/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - name
 *          - email
 *        properties:
 *          name:
 *            type: string
 *          email:
 *            type: string
 *            format: email
 *            description: Email for the user, needs to be unique.
 *          phoneNumber:
 *            type: string
 *        example:
 *           id: 93jf8rjk-12eij9a-qd123rw-12341sf
 *           name: John Smith
 *           email: johnsmith@email.com
 *           phoneNumber: "01122334455"
 */
