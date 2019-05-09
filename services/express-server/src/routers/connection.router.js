const express = require('express');
const connectionRouter = express.Router();
const { ConnectionCtrl } = require('../controllers/');

connectionRouter.use(function timeLog(req, res, next) {
    console.log(`${JSON.stringify(req.headers)}`);
    next();
});

connectionRouter.get('/',       (req,res) => ConnectionCtrl.get(req,res));
connectionRouter.post('/',   (req, res) => ConnectionCtrl.post(req,res));
connectionRouter.put('/',    (req, res) => ConnectionCtrl.put(req,res));
connectionRouter.get('/:id',    (req,res) => ConnectionCtrl.getById(req,res));
connectionRouter.put('/:id',    (req, res) => ConnectionCtrl.putById(req,res));
connectionRouter.delete('/:id',  (req, res) => ConnectionCtrl.deleteById(req,res));

module.exports = connectionRouter;