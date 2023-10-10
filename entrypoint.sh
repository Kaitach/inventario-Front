#!/bin/sh

if [ -n "$HOST_3000" ]; then
  sed -i "s/localhost/$HOST_3000/g" /usr/share/nginx/html/assets/env.js
fi

if [ -n "$HOST_3001" ]; then
  sed -i "s/localhost/$HOST_3001/g" /usr/share/nginx/html/assets/env.js
fi

if [ -n "$HOST_3002" ]; then
  sed -i "s/localhost/$HOST_3002/g" /usr/share/nginx/html/html/assets/env.js
fi

if [ -n "$HOST_81" ]; then
  sed -i "s/localhost/$HOST_81/g" /usr/share/nginx/html/assets/env.js
fi

nginx -g "daemon off;"
