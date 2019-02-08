const express = require('express');
const mappingRouter = express.Router();
const { MappingCtrl } = require('../controllers/');

mappingRouter.get(   '/',    (req, res) => MappingCtrl.get(req,res));
mappingRouter.post(  '/',    (req, res) => MappingCtrl.post(req,res));
mappingRouter.get(   '/:id', (req, res) => MappingCtrl.getById(req,res));
mappingRouter.put(   '/:id', (req, res) => MappingCtrl.put(req,res));
mappingRouter.delete('/:id', (req, res) => MappingCtrl.deleteById(req,res));


module.exports = mappingRouter;