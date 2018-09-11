# Dependency Mapper GUI application

GUI for Graphingwiki.

CS-Aware at OUSGP univ. of Oulu.

## Development

1. git clone https://github.com/tvaisanen/dependencymapping
2. docker-compose up

### Run tests

React web app: `docker exec -it dependencymapping_web npm test`

Django Rest API: `docker exec -it dependencymapping_api ptw`

Check docker container ls if container not found.


## Environment

Host setup is done in file `.env` where variables required
by React app stars with `REACT_APP`. Environment variables
that are not required by the app can omit the prefix. 


### Application

Application is run behind NGINX reverse proxy. All of the traffic
goes through via proxy. If it is required to allow the applications
accessed without proxy uncomment the `ports: -PORT:PORT` from 
docker-compose.yml. 

Api is accessed through api.API_HOST
