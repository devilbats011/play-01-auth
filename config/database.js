const config = {
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE || 'auth',
  dialect: process.env.DB_DIALECT || 'mysql',
  host: process.env.DB_HOST || 'localhost',
  logging: false,
}

module.exports = {
  local: { ...config },
  master: { ...config },
}
