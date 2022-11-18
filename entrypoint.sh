#!/bin/sh

cd /app/backend/

python manage.py makemigrations
python manage.py migrate --no-input
# python manage.py collectstatic --no-input

python3 manage.py setup_cloudproviders

gunicorn backend.wsgi:application --bind 0.0.0.0:8000
