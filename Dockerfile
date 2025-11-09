# sudo docker build . -t livescoreboard_app
# sudo docker run --name=livescoreboard_app -d --rm -p5000:5000 -it livescoreboard_app
FROM node:18

RUN apt update && apt install supervisor -y

RUN mkdir -p /app

WORKDIR /app

COPY package*.json ./
COPY server/package*.json ./server/
COPY client/package*.json ./client/

RUN npm run install:all

COPY server ./server
COPY client ./client
COPY .env ./.env

RUN cd client && npm run build

COPY supervisord.conf /etc/supervisord.conf

EXPOSE 5000

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
