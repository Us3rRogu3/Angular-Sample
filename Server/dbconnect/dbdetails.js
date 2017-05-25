module.exports = {
  'mssql': {
    'username': 'sa',
    'password': 'StandardPassword123$',
    'type': 'mssql',
    'host': 'localhost',
    'database': 'sample',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    'port': 1434
  },
  'mysql': {
    'username': 'root',
    'password': 'StandardPassword123$',
    'type': 'mysql',
    'host': 'localhost',
    'database': 'sample',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    'port': 3306
  }
}
