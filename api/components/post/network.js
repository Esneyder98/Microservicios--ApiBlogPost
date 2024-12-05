const express = require('express');

const secure = require('../user/secure')
const response = require('../../../network/response')
const Controller = require('./index');

const router = express.Router();

router.get('/',list)
router.get('/:id',getByid);

router.post('/',secure('check'),create)
router.put('/',secure('update'),update)


async function list(req,res,next) {
    try {
       const list = await Controller.list();
       response.success(req,res,list,200)
    } catch (error) {
        console.log("🚀 ~ list ~ error:", error)
        next(error)
    }
}


async function getByid(req,res,next){
    try {
        const user = await Controller.get(req.params.id);
        response.success(req,res,user,200)
    } catch (error) {
        next(error)
    }
}

async function create(req,res,next){
    try {
        const userId = req.user.userId
        const post = await Controller.create(req.body,userId);
        response.success(req,res,{},201)
    } catch (error) {
        next(error)
    }
}
async function update(req,res,next){
    try {
        const post = await Controller.update(req.body);
        response.success(req,res,{},201)
    } catch (error) {
        next(error)
    }
}

module.exports = router;