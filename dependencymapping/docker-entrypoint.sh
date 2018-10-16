#!/bin/bash

echo "################# ${ENVIRONMENT} #################"

# echo "Collect static files"
# python manage.py collectstatic --noinput

echo "Apply database migrations"
python manage.py migrate
python manage.py makemigrations
python manage.py migrate
# default login credentials
# username: admin
# password: password
cat set_default_config.py | python manage.py shell

echo "Starting server"
python manage.py runserver 0.0.0.0:8000
