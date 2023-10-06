FROM nginx:alpine
COPY ./dist/inventory-front/ /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
