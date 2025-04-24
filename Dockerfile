FROM node:20-slim

WORKDIR /app
RUN npm install -g @angular/cli
COPY ./ /app

CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200"]



