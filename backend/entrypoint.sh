#!/bin/sh

cd /app/Eye

python manage.py migrate --no-input
python manage.py collectstatic --no-input

gunicorn Eye.wsgi:application --bind 0.0.0.0:8000
