config=/etc/nginx/conf.d/default.conf
sed -i "s/http:\/\/elephantbi.com/${WEBSITE_URL}/g" $config
sed -i "s/http:\/\/m.elephantbi.com/${WEBSITE_MOBILE_URL}/g" $config

indexFile=/usr/share/nginx/html/index.html
sed -i "s/https:\/\/api.elephantbi.com/${BACKEND_URL}/g" $indexFile
serverFile=/usr/share/nginx/html/server.html
sed -i "s/https:\/\/api.elephantbi.com/${BACKEND_URL}/g" $serverFile
productFile=/usr/share/nginx/html/product.html
sed -i "s/https:\/\/api.elephantbi.com/${BACKEND_URL}/g" $productFile
aboutFile=/usr/share/nginx/html/about.html
sed -i "s/https:\/\/api.elephantbi.com/${BACKEND_URL}/g" $aboutFile

nginx -p /usr/share/nginx -g "daemon off;"
