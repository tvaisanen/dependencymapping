#!/bin/bash

echo "Current working directory"
echo $(pwd)

echo "Collect static files"
python manage.py collectstatic --noinput

echo "Apply database migrations"
python manage.py migrate

# default login credentials
# username: admin
# password: password
echo "Create admin user"
echo "from django.contrib.auth.models import User; User.objects.create_superuser('admin', 'admin@example.com', 'password')" | python manage.py shell

echo "Starting server"
python manage.py runserver 0.0.0.0:8000
