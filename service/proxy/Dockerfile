#FROM nginx:1.13
FROM jboesl/docker-nginx-headers-more
COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./site-enabled/ /etc/nginx/

