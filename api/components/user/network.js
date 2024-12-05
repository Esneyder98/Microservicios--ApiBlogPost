const express = require('express');

const secure = require('./secure')
const response = require('../../../network/response');
const Controller = require('./index')
const router = express.Router();

router.get('/',list)
router.post('/follow/:id',secure('follow'),follow);
router.get('/:id/following', following);
router.get('/:id',getByid);

router.post('/',create)
router.put('/',secure('update'),update)
router.delete('/:id',remove)

async function list(req,res,next) {
    try {
        const list = await Controller.list();
        response.success(req,res,list,200) 
    } catch (error) {
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
        const user = await Controller.create(req.body);
        response.success(req,res,{},201)
    } catch (error) {
        next(error)
    }
}
async function update(req,res,next){
    try {
        const user = await Controller.update(req.body);
        response.success(req,res,{},201)
    } catch (error) {
        next(error)
    }
}

async function remove(req,res,next) {
    try {
        const user = await Controller.remove(req.params.id);
        response.success(req,res,user,200)
    } catch (error) {
        next(error)
    }
}

async function follow(req,res,next){  
    try {   
        const user = await Controller.follow(req.user.userId, req.params.id);
        response.success(req,res,user)
    } catch (error) {
        next(error)
    }
    
}

async function following(req,res,next){  
    try {   
        const user = await Controller.following(req.params.id);
        return response.success(req,res,user,200)
    } catch (error) {
        next(error)
    }
    
}
module.exports = router;