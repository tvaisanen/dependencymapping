const Router = require('express').Router;
const assetRouter = Router();
const { AssetCtrl } = require('../controllers/');

assetRouter.use((req,res,next)=> {
   // middleware for assetRouter
   console.log(`assetRouter :: ${req.method}`);
   next();
});

// https://app.swaggerhub.com/apis-docs/tvaisanen_dev/dependency-maps/1.0.0-oas3
assetRouter.get('/',                (req,res) => AssetCtrl.get(req,res));
assetRouter.post('/',               (req,res) => AssetCtrl.post(req,res));

// by id
assetRouter.get('/:id',             (req,res) => AssetCtrl.getById(req,res));
assetRouter.put('/:id',             (req,res) => AssetCtrl.putById(req,res));
assetRouter.delete('/:id',          (req,res) => AssetCtrl.deleteById(req,res));

// by name
assetRouter.get('/byName/:name',    (req,res) => AssetCtrl.getByName(req,res));
assetRouter.delete('/byName/:name', (req,res) => AssetCtrl.deleteByName(req,res));

module.exports = assetRouter;
