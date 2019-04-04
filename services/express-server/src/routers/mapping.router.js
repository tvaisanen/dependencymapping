const express = require('express');
const mappingRouter = express.Router();
const { MappingCtrl } = require('../controllers/');

// todo: MappingCtrl.getByName()

mappingRouter.get(   '/',               (req, res) => MappingCtrl.get(req,res));
mappingRouter.post(  '/',               (req, res) => MappingCtrl.post(req,res));

mappingRouter.get(   '/export',         MappingCtrl.export);

mappingRouter.get(   '/:id',            (req, res) => MappingCtrl.getById(req,res));
mappingRouter.put(   '/:id',            (req, res) => MappingCtrl.putById(req,res));
mappingRouter.delete('/:id',            (req, res) => MappingCtrl.deleteById(req,res));
mappingRouter.put(   '/byName/:name',   (req, res) => MappingCtrl.putByName(req,res));
mappingRouter.delete('/byName/:name',   (req, res) => MappingCtrl.deleteByName(req,res));


module.exports = mappingRouter;