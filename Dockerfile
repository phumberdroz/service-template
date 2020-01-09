FROM node:12-slim

ENV SOURCES /app

COPY . ${SOURCES}
WORKDIR ${SOURCES}
RUN chown -R node:node ${SOURCES} \
    && chmod 777 /tmp
USER node
RUN npm install --production --quiet

EXPOSE 3000

CMD ["npm", "start"]
