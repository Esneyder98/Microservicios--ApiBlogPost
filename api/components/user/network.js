const express = require('express');

const secure = require('./secure')
const response = require('../../../network/response');
const Controller = require('./index')
const router = express.Router();

router.get('/',list)

router.get('/:id',getByid)

router.post('/',upsert)
router.put('/',secure('update'),upsert)
router.delete('/:id',remove)

async function list(req,res,next) {
    try {
        const list = await Controller.list();
        response.success(req,res,list,200) 
    } catch (error) {
        next()
    }
}

async function getByid(req,res,next){
    try {
        const user = await Controller.get(req.params.id);
        response.success(req,res,user,200)
    } catch (error) {
        next()
    }
}

async function upsert(req,res,next){
    try {
        const user = await Controller.upsert(req.body);
        console.log("🚀 ~ upsert ~ user:", user)
        
        response.success(req,res,{},201)
    } catch (error) {
        next()
    }
}

async function remove(req,res,next) {
    try {
        const user = await Controller.remove(req.params.id);
        response.success(req,res,user,200)
    } catch (error) {
        next()
    }
}
module.exports = router;