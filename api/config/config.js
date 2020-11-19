require('dotenv').config()

module.exports = {
  development: {
    database: "process_review_api_dev",
    dialect: 'postgres',
  },
  test: {
    database: "process_review_api_test",
    dialect: 'postgres',
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    "dialectOptions": {
      "ssl": {
        "rejectUnauthorized": false
      }
   }
  },
}
