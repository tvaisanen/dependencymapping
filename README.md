# Dependency Mapper GUI application

GUI for Graphingwiki.

![screenshot](https://github.com/tvaisanen/dependencymapping/raw/master/img/dependency-mapper-screen.png)
CS-Aware at OUSGP univ. of Oulu.

## Development

1. git clone https://github.com/tvaisanen/dependencymapping
2. docker-compose -f docker-compose.development.yml up

This starts three services for development.

* React JS hotreloaded dev server
    - `./src` is mounted into the container allowing live editing
    - uses Jest for unit tests
    
* Express backend API
    - `./src` is mounted into the container allowing live editing
    - uses Mocha and Chai for unit tests
    
* Mongo DB
    - generic Mongo DB instance with defaults

File `docker-compose.development.yml` resets the database
on page refresh. If you need the data to persist use the 
file `docker-compose.development.persistent-data.yml` and
the application will use different database in Mongo and
the resetting will be disabled.

### Run tests

get container ids with: `docker ps`

web app: `docker exec -it ${id for web} npm test`
api app: `docker exec -it ${id for api} npm test`

## Environment

Host setup is done in file `.env` where variables required
by React app stars with `REACT_APP`. Environment variables
that are not required by the webapp can be used without the prefix. 


### Application

Application is run behind NGINX reverse proxy. All of the traffic
goes via proxy. To open applications ports to be
accessed without without the proxy uncomment the `ports: -PORT:PORT` from 
docker-compose.yml. 

Api is accessed through https://api.API_HOST
