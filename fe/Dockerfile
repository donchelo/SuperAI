# build stage
FROM node:lts-alpine
## Create 'app' folder inside the container use it to run the subsecuent commands from there
WORKDIR /app

# Custom cache invalidation
ARG CACHEBUST=1

## Copy both 'package.json' and 'package-lock.json' (if available)
COPY ./fe/package*.json ./
# install project dependencies
RUN npm install
## copy project files and folders to the current working directory (i.e. 'app' folder)
COPY ./fe ./
# Set environment variables from args
ARG VITE_API_URL
ARG VITE_OPENAI_API_KEY

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_OPENAI_API_KEY=$VITE_OPENAI_API_KEY
# ARG VITE_API_URL
# ARG VITE_MSAL_TENANT_ID
# ARG VITE_MSAL_AUTHORITY
# ARG VITE_MSAL_CLIENT_ID
# ENV VITE_API_URL=$VITE_API_URL
# ENV VITE_MSAL_TENANT_ID=$VITE_MSAL_TENANT_ID
# ENV VITE_MSAL_AUTHORITY=$VITE_MSAL_AUTHORITY
# ENV VITE_MSAL_CLIENT_ID=$VITE_MSAL_CLIENT_ID
## build app for production with minification
RUN npm run build

# production stage
FROM nginx:stable-alpine
## Copy build front-end from the 'build stage
RUN rm -rf /etc/nginx/conf.d
COPY ./fe/conf /etc/nginx

COPY --from=0 /app/dist /usr/share/nginx/html