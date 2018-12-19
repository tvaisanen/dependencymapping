# Dependency Mapper GUI application

GUI for Graphingwiki.

![screenshot](https://tvaisanen.github.com/img/dependency-mapper-screen.png)

CS-Aware at OUSGP univ. of Oulu.

## Development

1. git clone https://github.com/tvaisanen/dependencymapping
2. docker-compose up

### Run tests

React web app: `docker exec -it dependencymapping_web npm test`

Django Rest API: `docker exec -it dependencymapping_api ptw`

run `docker container ls` if container if default container names are not found.


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
