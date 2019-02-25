const Router = require('express').Router;
const assetRouter = Router();
const { AssetCtrl } = require('../controllers/');

assetRouter.use((req,res,next)=> {
   // middleware for assetRouter
   console.log(`assetRouter :: ${req.method}`);
   next();
});

// https://app.swaggerhub.com/apis-docs/tvaisanen_dev/dependency-maps/1.0.0-oas3
assetRouter.get('/',        (req,res) => AssetCtrl.get(req,res));
assetRouter.post('/',       (req,res) => AssetCtrl.post(req,res));
assetRouter.get('/:id',     (req,res) => AssetCtrl.getById(req,res));
assetRouter.put('/:id',     (req,res) => AssetCtrl.put(req,res));
assetRouter.delete('/:id',  (req,res) => AssetCtrl.delete(req,res));

module.exports = assetRouter;
