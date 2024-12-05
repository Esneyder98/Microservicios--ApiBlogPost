const remote = require('./remote')

const config = require('../config')

module.exports = new remote(config.mysql_service.host, config.mysql_service.port)