# Dependency Mapper GUI application

Web app for dependency mapping.

![screenshot](https://github.com/tvaisanen/dependencymapping/raw/master/img/dependency-mapper-screen.png)

## Development

### docker-compose.dist.yml

Deployment setup using NGINX as reverse proxy and
for serving the static application files. 
Uses mongo DB as database
react app is built to static files and served via
NGINX, which also acts as reverse proxy for the api.

### docker-compose.dev.nginx.yml

* Same setup as in `docker-compose.dist.yml` with slight mods:
    * web app is attached as run by dev server.
    * tests are mounted into volumes

* Docker files used: `Dockerfile-dev`



### docker-compose.development.yml

1. git clone https://github.com/tvaisanen/dependencymapping
2. docker-compose -f docker-compose.development.yml up

This starts three services for development.

* React JS hotreloaded dev server
    - runs at `localhost:3001`
    - `./services/web/src` is mounted into the container allowing live editing
    - uses Jest for unit tests
    
* Express backend API
    - runs at `localhost:3000`
    - `./services/express-server/src` is mounted into the container allowing live editing
    - uses Mocha and Chai for unit tests
    
* Mongo DB
    - runs at `localhost: 27017`
    - generic Mongo DB instance with defaults

File `docker-compose.development.yml` resets the database
on page refresh. If you need the data to persist use the 
file `docker-compose.development.persistent-data.yml` and
the application will use different database in Mongo and
the resetting will be disabled.

### docker-compose.development.persistent-data.yml

Same as above, but database reset disabled by default.

### Run tests

get container ids with: `docker ps`

* web app: `docker exec -it ${id for web} npm test`
* api app: `docker exec -it ${id for api} npm test`

## Environment

Host setup is done in file `.env` where variables required
by React app stars with `REACT_APP`. Environment variables
that are not required by the webapp can be used without the prefix. 

