config=/etc/nginx/conf.d/default.conf
sed -i "s/http:\/\/elephantbi.com\//${WEBSITE_URL}/" $config
sed -i "s/http:\/\/m.elephantbi.com\//${WEBSITE_MOBILE_URL}/" $config

indexFile=/usr/share/nginx/html/index.html
sed -i "s/https:\/\/api.elephantbi.com/${BACKEND_URL}/g" $indexFile
serverFile=/usr/share/nginx/html/server.html
sed -i "s/https:\/\/api.elephantbi.com/${BACKEND_URL}/g" $serverFile
productFile=/usr/share/nginx/html/product.html
sed -i "s/https:\/\/api.elephantbi.com/${BACKEND_URL}/g" $productFile
aboutFile=/usr/share/nginx/html/about.html
sed -i "s/https:\/\/api.elephantbi.com/${BACKEND_URL}/g" $aboutFile

indexFile=/usr/share/nginx/html/index.html
sed -i "s/WX_CORP_ID/${WX_CORP_ID}/g" $indexFile
serverFile=/usr/share/nginx/html/server.html
sed -i "s/WX_CORP_ID/${WX_CORP_ID}/g" $serverFile
productFile=/usr/share/nginx/html/product.html
sed -i "s/WX_CORP_ID/${WX_CORP_ID}/g" $productFile
aboutFile=/usr/share/nginx/html/about.html
sed -i "s/WX_CORP_ID/${WX_CORP_ID}/g" $aboutFile

indexFile=/usr/share/nginx/html/index.html
sed -i "s/IMAGE_ENV/${IMAGE_ENV}/g" $indexFile
serverFile=/usr/share/nginx/html/server.html
sed -i "s/IMAGE_ENV/${IMAGE_ENV}/g" $serverFile
productFile=/usr/share/nginx/html/product.html
sed -i "s/IMAGE_ENV/${IMAGE_ENV}/g" $productFile
aboutFile=/usr/share/nginx/html/about.html
sed -i "s/IMAGE_ENV/${IMAGE_ENV}/g" $aboutFile

indexFile=/usr/share/nginx/html/index.html
sed -i "s/OAUTH_URL/${OAUTH_URL}/g" $indexFile
serverFile=/usr/share/nginx/html/server.html
sed -i "s/OAUTH_URL/${OAUTH_URL}/g" $serverFile
productFile=/usr/share/nginx/html/product.html
sed -i "s/OAUTH_URL/${OAUTH_URL}/g" $productFile
aboutFile=/usr/share/nginx/html/about.html
sed -i "s/OAUTH_URL/${OAUTH_URL}/g" $aboutFile

nginx -p /usr/share/nginx -g "daemon off;"
