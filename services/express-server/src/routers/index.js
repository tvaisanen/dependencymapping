const assetRouter = require('./asset.router');
const connectionRouter = require('./connection.router');
const mappingRouter = require('./mapping.router');
const tagRouter = require('./tag.router');

const pathToRouter = [
    {path: "/asset", router: assetRouter},
    {path: "/connection", router: connectionRouter},
    {path: "/mapping", router: mappingRouter},
    {path: "/tag", router: tagRouter},
];

function registerRouters(app){
    pathToRouter.forEach(route => {
       app.use(route.path, route.router);
    })
}

module.exports = {
    registerRoutes: registerRouters
};