const Router = require('express').Router;
const assetRouter = Router();
const AssetController = require('../controllers/asset.controller');

// https://app.swaggerhub.com/apis-docs/tvaisanen_dev/dependency-maps/1.0.0-oas3
assetRouter.get('/',        (req,res) => AssetController.get(req,res));
assetRouter.post('/',       (req,res) => AssetController.post(req,res));
assetRouter.get('/:id',     (req,res) => AssetController.getById(req,res));
assetRouter.put('/:id',     (req,res) => AssetController.put(req,res));
assetRouter.delete('/:id',  (req,res) => AssetController.delete(req,res));

module.exports = assetRouter;
