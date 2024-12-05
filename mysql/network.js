const express = require('express');
const response = require('../network/response')
const Store = require('../store/mysql')
const router = express.Router();

router.get('/:table', list);
router.get('/:table/:id', get);
router.post('/:table', insert);
router.post('/:table', upsert);
router.post('/:table/query', query);
router.post('/userExists', userExist);

async function list(req, res, next) {
    const datos = await Store.list(req.params.table);
    return response.success(req, res, datos, 200);
};

async function get(req, res, next) {
    const datos = await Store.get(req.params.table,req.params.id);
    return response.success(req, res, datos, 200);
}

async function insert(req, res, next) {
    const datos = await Store.upsert(req.params.table,req.body);
    return response.success(req, res, datos, 200);
}

async function upsert(req, res, next) {
    const datos = await Store.upsert(req.params.table,req.body);
    return response.success(req, res, datos, 200);
}

async function query(req, res, next) {
    const datos = await store.query(req.params.table, req.body.query, req.body.join)
    response.success(req, res, data, 200);
}

async function userExist(req, res, next) {
    const user = {
        name: body.name,
        username: body.username,
    }
    const existUser = await store.checkIfUserExists(user.username,user.name);
    console.log("🚀 ~ userExist ~ existUser:", existUser)
    if (existUser) {
        const error = new Error("Usuario ya creado con esos datos");
        error.statusCode = 409; // Código HTTP 409 para conflicto
        return response.error(req, res, existUser, 409);  // Lanza el error con un código de estado adecuado
    }
    return response.success(req, res, {}, 200);
}

module.exports = router;
