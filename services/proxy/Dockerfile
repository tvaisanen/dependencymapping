#FROM nginx:1.13
FROM jboesl/docker-nginx-headers-more
RUN apk add apache2-utils openssl
COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./site-enabled/ /etc/nginx/

RUN mkdir /etc/nginx/auth.d
RUN touch /etc/nginx/auth.d/auth.pwd
RUN htpasswd -b -d -c /etc/nginx/auth.d/auth.pwd admin password

COPY ./ssl/ /etc/nginx/ssl
COPY ./snippets/ /etc/nginx/snippets

RUN ls /etc/nginx
