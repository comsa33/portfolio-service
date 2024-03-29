FROM python:3.10.10-slim-bullseye

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUTF8=1 \
    PIP_NO_CACHE_DIR=on \
    PIP_DISABLE_PIP_VERSION_CHECK=on

WORKDIR /usr/src

COPY requirements.txt pyproject.toml poetry.lock /usr/src/

RUN apt update -y
RUN pip install -r requirements.txt
RUN poetry config virtualenvs.create false
RUN if [ -f pyproject.toml ]; then poetry install --verbose; fi

COPY . /usr/src/app
WORKDIR /usr/src/app
ENV FLASK_APP=run.py

EXPOSE 5000

CMD flask db upgrade && flask run --host=0.0.0.0
