FROM alpine
FROM python:3.6
WORKDIR /usr/api/src
COPY ./requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
VOLUME ["/usr/api/src"]
EXPOSE 8000
CMD ["bash", "docker-entrypoint.sh"]

