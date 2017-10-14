FROM node:slim

COPY app.js /

EXPOSE 80

CMD [ "node", "app.js" ]
