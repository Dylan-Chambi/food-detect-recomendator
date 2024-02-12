# Build a vite + react app
FROM node:18-alpine as build

ARG BACKEND_URL

ARG BACKEND_PORT

ARG BASE_PATH

ENV VITE_BACKEND_URL=${BACKEND_URL}:${BACKEND_PORT}

WORKDIR /app

COPY package.json package-lock.json ./

RUN --mount=type=cache,target=/root/.npm npm install

COPY . .

RUN npm run build -- --base=${BASE_PATH}


FROM nginx:alpine as production

ARG FRONTEND_HOST

ARG FRONTEND_PORT

ARG BASE_PATH

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /tmp/nginx.conf.template

ENV HOST=${FRONTEND_HOST}

ENV PORT=${FRONTEND_PORT}

ENV BASE_PATH=${BASE_PATH}

RUN envsubst '$HOST $PORT $BASE_PATH' < /tmp/nginx.conf.template > /etc/nginx/conf.d/default.conf

EXPOSE ${FRONTEND_PORT}

CMD ["nginx", "-g", "daemon off;"]
