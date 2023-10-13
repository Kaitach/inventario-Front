#!/bin/sh

echo "Valor de BACKEND_API_URI: $BACKEND_API_URI"
echo "Valor de PERSISTENCE_API_URI: $PERSISTENCE_API_URI"
echo "Valor de SOCKETIO_API_URI: $SOCKETIO_API_URI"

if [ -n "$BACKEND_API_URI" ]; then
  # Reemplazar la URL original con el valor de la variable
  sed -i "s|http://localhost:3000|$BACKEND_API_URI|g" /usr/share/nginx/html/assets/env.js
fi

# Repite el mismo proceso para las otras variables si es necesario
if [ -n "$PERSISTENCE_API_URI" ]; then
  sed -i "s|http://localhost:3002|$PERSISTENCE_API_URI|g" /usr/share/nginx/html/assets/env.js
fi

if [ -n "$SOCKETIO_API_URI" ]; then
  sed -i "s|http://localhost:81|$SOCKETIO_API_URI|g" /usr/share/nginx/html/assets/env.js
fi
if [ -n "$BACKENDLOGIN_API_URI" ]; then
  sed -i "s|http://localhost:81|$BACKENDLOGIN_API_URI|g" /usr/share/nginx/html/assets/env.js
fi
nginx -g 'daemon off;'




