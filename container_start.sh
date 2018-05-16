indexFile=/usr/share/nginx/html/index.html
# sed -i "s/http:\/\/api.flexceed.top/${BACKEND_URL}/g" $indexFile
nginx -g "daemon off;"
