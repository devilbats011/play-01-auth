'use strict'

const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const Umzug = require('umzug')
const basename = path.basename(__filename)
const config = require(__dirname + '/../../config/database')[process.env.NODE_ENV]
const db = {}

let sequelize
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config)
}

const umzug = new Umzug({
  migrations: {
    path: 'db/migrations',
    params: [sequelize.getQueryInterface(), Sequelize],
  },
  storage: 'sequelize',
  storageOptions: { sequelize },
})
umzug
  .up()
  .then(() => console.log('UMZUG: Finished running migrations'))
  .catch((e) => {
    console.log('UMZUG: Error running migrations:', e.original)
    process.exit(0)
  })

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
    db[model.name] = model
  })

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
