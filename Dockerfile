FROM node:12.19.0

 

WORKDIR  /app

 

COPY ./ /app/

 

RUN npm install

 

EXPOSE 4200

 

ENTRYPOINT npm run ng serve