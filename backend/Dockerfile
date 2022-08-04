FROM python:3.8.5-alpine

RUN pip install --upgrade pip

COPY .backend/requirements/dev-requirements.txt .

RUN pip install -r dev-requirements.txt

COPY ./django_project /app

WORKDIR /app

COPY ./entrypoint.sh /
ENTRYPOINT ["sh","/entrypoint.sh"]