const express = require('express');
const connectionRouter = express.Router();
const ConnectionController = require('../controllers/').Connection;

connectionRouter.get('/', (req,res) => ConnectionController.get(req,res));
connectionRouter.get('/:id', (req,res) => ConnectionController.get(req,res));
connectionRouter.put('(/:id)?', (req, res) => ConnectionController.put(req,res));
connectionRouter.post('(/:id)?', (req, res) => ConnectionController.post(req,res));
connectionRouter.delete('/:id', (req, res) => ConnectionController.deleteById(req,res));

module.exports = connectionRouter;