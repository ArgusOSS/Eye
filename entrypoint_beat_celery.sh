#!/bin/sh

cd /app/backend
exec celery -A backend beat -l info
