#!/bin/sh

cd /app/backend

python manage.py makemigrations
python manage.py migrate --no-input

exec celery -A backend beat -l info --loglevel=debug 
