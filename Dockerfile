FROM node:12.18.0-alpine as build
WORKDIR /application/Frontend
COPY ./Frontend/package.json ./
COPY ./Frontend/package-lock.json ./
RUN npm install
COPY ./Frontend ./
RUN npm start build

FROM python:3.6.9-slim-buster
WORKDIR /application/Backend
ENV PYTHONPATH "${PYTHONPATH}:/application"
COPY ./Backend/requirements.txt .
RUN pip install -r requirements.txt
COPY ./Backend ./
COPY --from=build /application/Frontend ../Frontend
CMD python ./application.py
