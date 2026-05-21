FROM node:20 AS build

WORKDIR /app

COPY frontend-empleado/package*.json ./

RUN npm install --legacy-peer-deps

COPY frontend-empleado/ .

RUN npm run build -- --configuration production

FROM nginx:alpine

COPY --from=build /app/dist/frontend-empleado /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
