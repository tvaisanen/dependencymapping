FROM alpine
FROM python:3.6
WORKDIR /usr/api/src
ADD . .
#COPY ./requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
VOLUME ["/usr/api/src"]
EXPOSE 8000
RUN ls
RUN pwd
CMD ["bash", "docker-entrypoint.sh"]

