#!/bin/sh

cd /app/backend/

python manage.py makemigrations
python manage.py migrate --no-input
# python manage.py collectstatic --no-input

python3 manage.py setup_cloudproviders


# DEMO_INSTANCE is the instance running on railway.
if [[ $DEMO_INSTANCE = "true" ]]; then python3 manage.py setup_adddemouser; fi
gunicorn backend.wsgi:application --bind 0.0.0.0:8000
