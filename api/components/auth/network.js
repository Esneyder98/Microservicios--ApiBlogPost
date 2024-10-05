const express = require('express');

const response = require('../../../network/response')
const Controller = require('./index');

const router = express.Router();

router.post('/login',login);

async function login(req,res) {
    try {
        const {username,password} = req.body
        const loginController = await Controller.login(username,password);
        return response.success(req,res,loginController,200);
    } catch (error) {
        return response.error(req,res,'Información invalida',400)
    }
}

module.exports = router;