#!/bin/sh

if [ -n "$API_3000" ]; then
  sed -i "s/localhost/$API_3000/g" /usr/share/nginx/assets/env.js
fi

if [ -n "$API_3001" ]; then
  sed -i "s/localhost/$API_3001/g" /usr/share/nginx/assets/env.js
fi

if [ -n "$API_3002" ]; then
  sed -i "s/localhost/$API_3002/g" /usr/share/nginx/assets/env.js
fi

if [ -n "$API_81" ]; then
  sed -i "s/localhost/$API_81/g" /usr/share/nginx/assets/env.js
fi

nginx -g "daemon off;"
