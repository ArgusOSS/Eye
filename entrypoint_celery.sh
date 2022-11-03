#!/bin/sh

cd /app/backend
exec celery -A backend worker --loglevel=info --without-gossip --without-mingle --without-heartbeat -Ofair --pool=solo