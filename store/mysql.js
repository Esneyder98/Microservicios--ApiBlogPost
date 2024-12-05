const mysql = require('mysql2');
const config = require('../config');

const dbconf = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
    port: config.mysql.port,
};
// console.log("🚀 ~ dbconf:", dbconf)

// coneccion
let connection;

function handleCon (){
    connection = mysql.createConnection(dbconf);

    connection.connect((err) => {
        if(err){
            console.error('[db err]',err);
            setTimeout(handleCon, 2000);
        }else{
            console.log('DB conected!');
            
        }
        
    });

    connection.on('error', err =>{
        console.error('[db err]',err);
        if(err.code == 'PROTOCOL_CONNECTION_LOST'){
            handleCon();
        }else{
            throw err;
        }
    })
}

handleCon();


function list(table) {
    return new Promise( (resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    })
}

function get(table, id) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE id=${id}`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    })
}
async function checkIfUserExists(username, name) {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 1
            FROM user
            WHERE username = ? OR name = ? 
            LIMIT 1
        `;
        connection.query(query, [username, name], (err, results) => {
            if (err) {
                console.log("🚀 ~ checkIfUserExists ~ err:", err)
                
                return reject(err); // Rechazar si hay un error en la consulta
            }
            // Si hay resultados, significa que existe, por lo tanto, retornamos true
            if (results.length > 0) {
                
                return resolve(true);
            }
            // Si no hay resultados, retornamos false
            resolve(false);
        });
    });
}
function insert(table, data) {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO ${table} SET ?`;
        connection.query(query, data, (err, result) => {
            if (err) {
                console.error("Error en la inserción: ", err);
                return reject(err);
            }
            resolve(result);
        });
    });
}

function update(table, data) {
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE ${table} SET ? WHERE id=?`, [data, data.id], (err, result) => {
            if (err){
                    console.log("🚀 ~ mysql ~ update~ err:", err)
                 return reject(err);}
            resolve(result);
        })
    })
}

async function upsert(table, data) {
    if (data && data.id) {
        return await update(table, data);
    } else {
        const create = await insert(table, data);
        return create
    }
}

function query(table, query, join) {
    let joinQuery = '';
    if (join) {
        const key = Object.keys(join)[0];
        const val = join[key];
        joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
    }
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`, query, (err, res) => {
            if (err) return reject(err);
            resolve(res[0] || null);
        })
    })
}
module.exports = {
    list,
    get,
    upsert,
    query,
    checkIfUserExists
};