config=/etc/nginx/conf.d/default.conf
sed -i "s/http:\/\/elephantbi.com\//${WEBSITE_URL}/" $config
sed -i "s/http:\/\/m.elephantbi.com\//${WEBSITE_MOBILE_URL}/" $config

indexFile=/usr/share/nginx/html/index.html
sed -i "s/https:\/\/api.elephantbi.com/${BACKEND_URL}/g" $indexFile
serverFile=/usr/share/nginx/html/service.html
sed -i "s/https:\/\/api.elephantbi.com/${BACKEND_URL}/g" $serverFile
productFile=/usr/share/nginx/html/product.html
sed -i "s/https:\/\/api.elephantbi.com/${BACKEND_URL}/g" $productFile
aboutFile=/usr/share/nginx/html/about.html
sed -i "s/https:\/\/api.elephantbi.com/${BACKEND_URL}/g" $aboutFile
demoFile=/usr/share/nginx/html/demo.html
sed -i "s/https:\/\/api.elephantbi.com/${BACKEND_URL}/g" $demoFile
priceFile=/usr/share/nginx/html/price.html
sed -i "s/https:\/\/api.elephantbi.com/${BACKEND_URL}/g" $priceFile
registerFile=/usr/share/nginx/html/register.html
sed -i "s/https:\/\/api.elephantbi.com/${BACKEND_URL}/g" $registerFile
registerInfoFile=/usr/share/nginx/html/register-info.html
sed -i "s/https:\/\/api.elephantbi.com/${BACKEND_URL}/g" $registerInfoFile

indexFile=/usr/share/nginx/html/index.html
sed -i "s/WX_CORP_ID/${WX_CORP_ID}/g" $indexFile
serverFile=/usr/share/nginx/html/service.html
sed -i "s/WX_CORP_ID/${WX_CORP_ID}/g" $serverFile
productFile=/usr/share/nginx/html/product.html
sed -i "s/WX_CORP_ID/${WX_CORP_ID}/g" $productFile
aboutFile=/usr/share/nginx/html/about.html
sed -i "s/WX_CORP_ID/${WX_CORP_ID}/g" $aboutFile

indexFile=/usr/share/nginx/html/index.html
sed -i "s/IMAGE_ENV/${ENV}/g" $indexFile
serverFile=/usr/share/nginx/html/service.html
sed -i "s/IMAGE_ENV/${ENV}/g" $serverFile
productFile=/usr/share/nginx/html/product.html
sed -i "s/IMAGE_ENV/${ENV}/g" $productFile
aboutFile=/usr/share/nginx/html/about.html
sed -i "s/IMAGE_ENV/${ENV}/g" $aboutFile

indexFile=/usr/share/nginx/html/index.html
sed -i "s/OAUTH_URL/${OAUTH_URL}/g" $indexFile
serverFile=/usr/share/nginx/html/service.html
sed -i "s/OAUTH_URL/${OAUTH_URL}/g" $serverFile
productFile=/usr/share/nginx/html/product.html
sed -i "s/OAUTH_URL/${OAUTH_URL}/g" $productFile
aboutFile=/usr/share/nginx/html/about.html
sed -i "s/OAUTH_URL/${OAUTH_URL}/g" $aboutFile

indexFile=/usr/share/nginx/html/index.html
sed -i "s/DEMO_URL/${DEMO_URL}/g" $indexFile
serverFile=/usr/share/nginx/html/service.html
sed -i "s/DEMO_URL/${DEMO_URL}/g" $serverFile
productFile=/usr/share/nginx/html/product.html
sed -i "s/DEMO_URL/${DEMO_URL}/g" $productFile
aboutFile=/usr/share/nginx/html/about.html
sed -i "s/DEMO_URL/${DEMO_URL}/g" $aboutFile
demoFile=/usr/share/nginx/html/demo.html
sed -i "s/DEMO_URL/${DEMO_URL}/g" $demoFile
priceFile=/usr/share/nginx/html/price.html
sed -i "s/DEMO_URL/${DEMO_URL}/g" $priceFile
registerFile=/usr/share/nginx/html/register.html
sed -i "s/DEMO_URL/${DEMO_URL}/g" $registerFile
registerInfoFile=/usr/share/nginx/html/register-info.html
sed -i "s/DEMO_URL/${DEMO_URL}/g" $registerInfoFile

nginx -p /usr/share/nginx -g "daemon off;"
