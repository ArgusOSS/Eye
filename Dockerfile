FROM python:3.9.9-buster

RUN apt-get update \
    && apt-get install -y --no-install-recommends apt-utils libsasl2-dev libssl-dev \
    vim libldap2-dev python-dev libfuzzy-dev net-tools python3-psycopg2 git osslsigncode apache2-utils \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --upgrade pip

COPY ./requirements /app/requirements

WORKDIR /app

RUN pip install --no-cache-dir --compile -r requirements/run-requirements.txt

COPY ./backend /app/backend

EXPOSE 8000

COPY ./entrypoint.sh /app/
COPY ./entrypoint_celery.sh /app/
COPY ./entrypoint_beat_celery.sh /app/
