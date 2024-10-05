const express = require('express');

const response = require('../../../network/response')
const Controller = require('./index')
const router = express.Router();

router.get('/',list)

router.get('/:id',getByid)

router.post('/',upsert)
router.put('/',upsert)
router.delete('/:id',remove)

async function list(req,res) {
    try {
        const list = await Controller.list();
        response.success(req,res,list,200) 
    } catch (error) {
        response.error(req,res,error.message,500)
    }
}

async function getByid(req,res){
    try {
        const user = await Controller.get(req.params.id);
        response.success(req,res,user,200)
    } catch (error) {
        response.error(req,res,error.message,500)
    }
}

async function upsert(req,res){
    try {
        const user = await Controller.upsert(req.body);
        console.log("🚀 ~ upsert ~ user:", user)
        
        response.success(req,res,{},201)
    } catch (error) {
        response.error(req,res,error.message,500)
    }
}

async function remove(req,res) {
    try {
        const user = await Controller.remove(req.params.id);
        response.success(req,res,user,200)
    } catch (error) {
        response.error(req,res,error.message,500)
    }
}
module.exports = router;