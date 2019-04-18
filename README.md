# Dependency Mapper GUI application

Web app for dependency mapping.

![screenshot](https://github.com/tvaisanen/dependencymapping/raw/master/img/dependency-mapper-screen.png)

## Build

### docker-compose.dist.yml

Deployment setup using NGINX as reverse proxy and
for serving the static application files. 
Uses mongo DB as database
react app is built to static files and served via
NGINX, which also acts as reverse proxy for the api.

Application is served from port `8443`. To use this
setup with authentication, an authentication server
should be set up before the proxy.


## Development

### docker-compose.dev.yml

1. git clone https://github.com/tvaisanen/dependencymapping
2. docker-compose -f docker-compose.development.yml up

* Same setup as in `docker-compose.dist.yml` with slight mods:
    * web app is attached as run by dev server.
    * tests are mounted into volumes

* Docker files used: `Dockerfile-dev`


This starts four services for development.

* NGINX reverse proxy
    * HTTPS access to application
    * Web application uses this end point
    * Individual services can also be accessed from their dedicated ports if needed

* React JS dev server in watch mode
    - runs at `localhost:3001`
    - `./services/web/src` is mounted into the container allowing live editing
    - uses Jest for unit tests
    
* Express backend API in watch mode
    - runs at `localhost:3000`
    - `./services/express-server/src` is mounted into the container allowing live editing
    - uses Mocha and Chai for unit tests
    
* Mongo DB
    - runs at `localhost: 27017`
    - generic Mongo DB instance with defaults

### Additional API endpoints for development:
* reset test data: `get /api/reset-models`
* create your own 
    - create handler `services/express-server/src/utils/testHandlers.js`
    - bind the created handler to testHandlerRouter by using the `router.use`


### Run tests

get container ids with: `docker ps`
* web app: `docker exec -it ${id for web} npm test`
* api app: `docker exec -it ${id for api} npm test`

## Environment

* environment variables are set in docker-compose files

## Todo

* web socket connection between client and server for broadcasting updates to clients

