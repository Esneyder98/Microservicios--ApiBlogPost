require('dotenv').config();
module.exports = {
    api: {
        port: process.env.API_PORT || 3000
    },
    jwt:{
        secret: process.env.JWT_SECRET
    },
    mysql: {
        host: process.env.MYSQL_HOST || '',
        user: process.env.MYSQL_USER || '',
        password: process.env.MYSQL_PASSWORD || '',
        database: process.env.MYSQL_DATABASE || '',
        port: process.env.MYSQL_PORT || ''
    },
    mysql_service: {
        host: process.env.MYSQL_SERVICE_HOST ||'localhost',
        port: process.env.MYSQL_SERVICE_PORT ||3001
    }

}