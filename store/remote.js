const request = require('request');

function createRemoteDB(host,port) {
    const URL = 'http://'+host+':'+port;

    function list (table){
       return  req('GET', table)
    };

    
    function get(table, id) {
        return req('GET', `${table}/${id}`);
    }

    function query(tabla, query, join = '') {
        return request({
        method: 'GET',
        url: `/query/${tabla}`,
        data: {
            "query": query,
            "join": join
        }
        })
    }

    function insert(table, data) {
        return req('POST', table, data);
    }

    function update(table, data) {
        return req('PUT', table, data);
    }

    function upsert(table, data) {
    if(data.id) {
        return update(table, data);
    }
    return insert(table, data);
    }
    
    function query(table, query, join) {
		return req('POST', table + '/query', { query, join });
	}

    async function remove(tabla, id) {
        return request({
        method: 'DELETE',
        url: `/${tabla}/${id}`
        })
    }

  async function checkIfUserExists(username, name) {
    const data = { username, name };
    const response = await req('POST', 'user', data);
    console.log("🚀 ~ checkIfUserExists ~ response:", response)
    
    return response
}

    function req(method, table, data) {
        const url = `${URL}/${table}`;
        const body = data ? JSON.stringify(data) : null;

        return new Promise((resolve, reject) => {
            request({
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                url,
                body,
            }, (err, res, body) => {
                if (err) {
                    console.error("Error con la base de datos remota:", err);
                    return reject(err.message);
                }

                try {
                    const resp = JSON.parse(body);
                    resolve(resp);
                } catch (parseError) {
                    reject("Error al parsear la respuesta: " + parseError.message);
                }
            });
        });
    }

    return {
        list,
        get,
        query,
        insert,
        update,
        upsert,
        remove,
        checkIfUserExists,
    }
}

module.exports = createRemoteDB;