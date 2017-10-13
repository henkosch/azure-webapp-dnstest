FROM node

COPY app.js /

EXPOSE 80

CMD [ "node", "app.js" ]
