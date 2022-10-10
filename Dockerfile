FROM python:3.9.9-buster

RUN apt-get update \
    && apt-get install -y --no-install-recommends apt-utils libsasl2-dev libssl-dev \
    vim libldap2-dev python-dev libfuzzy-dev net-tools python3-psycopg2 git osslsigncode apache2-utils \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --upgrade pip

COPY ./ /app

WORKDIR /app

RUN pip install --no-cache-dir --compile -r requirements/run-requirements.txt

EXPOSE 8000

ENTRYPOINT ["sh","entrypoint.sh"]