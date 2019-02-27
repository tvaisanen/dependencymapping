const express = require('express');
const Tag = require('../models').Tag;
const tagRouter = express.Router();
const hal = require('../utils/hal.utils');
const {TagCtrl} = require('../controllers/');

tagRouter.get('/', (req, res) => TagCtrl.get(req, res));
tagRouter.post('/', (req, res) => TagCtrl.post(req, res));
tagRouter.get('/:id', (req, res) => TagCtrl.getById(req, res));
tagRouter.put('/:id', (req, res) => TagCtrl.putById(req, res));
tagRouter.delete('/:id', (req, res) => TagCtrl.deleteById(req, res));
tagRouter.put('/byName/:name', (req, res) => TagCtrl.putByName(req, res));
tagRouter.delete('/byName/:name', (req, res) => TagCtrl.deleteByName(req, res));


module.exports = tagRouter;