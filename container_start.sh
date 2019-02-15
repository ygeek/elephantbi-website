config=/etc/nginx/conf.d/default.conf
sed -i "s/http:\/\/elephantbi.com\//${WEBSITE_URL}/" $config
sed -i "s/http:\/\/www.elephantbi.com\//${WEBSITE_URL}/" $config
sed -i "s/http:\/\/m.elephantbi.com\//${WEBSITE_MOBILE_URL}/" $config
sed -i "s/DOMAIN/${DOMAIN}/g" $config

#cn
indexFile=/usr/share/nginx/html/index.html
sed -i "s/https:\/\/api.elephantbi.com/${BACKEND_URL}/g" $indexFile
sed -i "s/DEMO_URL/${DEMO_URL}/g" $indexFile
sed -i "s/VIDEO_URL/${VIDEO_URL}/g" $indexFile
sed -i "s/https:\/\/www.xydatatech.com/${XYDATATECH_URL}/g" $indexFile
serverFile=/usr/share/nginx/html/service.html
sed -i "s/https:\/\/api.elephantbi.com/${BACKEND_URL}/g" $serverFile
sed -i "s/DEMO_URL/${DEMO_URL}/g" $serverFile
sed -i "s/https:\/\/www.xydatatech.com/${XYDATATECH_URL}/g" $serverFile
demoFile=/usr/share/nginx/html/demo.html
sed -i "s/https:\/\/api.elephantbi.com/${BACKEND_URL}/g" $demoFile
sed -i "s/DEMO_URL/${DEMO_URL}/g" $demoFile
sed -i "s/https:\/\/www.xydatatech.com/${XYDATATECH_URL}/g" $demoFile
priceFile=/usr/share/nginx/html/price.html
sed -i "s/https:\/\/api.elephantbi.com/${BACKEND_URL}/g" $priceFile
sed -i "s/DEMO_URL/${DEMO_URL}/g" $priceFile
sed -i "s/https:\/\/www.xydatatech.com/${XYDATATECH_URL}/g" $priceFile
registerFile=/usr/share/nginx/html/register.html
sed -i "s/https:\/\/api.elephantbi.com/${BACKEND_URL}/g" $registerFile
sed -i "s/DEMO_URL/${DEMO_URL}/g" $registerFile
registerInfoFile=/usr/share/nginx/html/register-info.html
sed -i "s/https:\/\/api.elephantbi.com/${BACKEND_URL}/g" $registerInfoFile
sed -i "s/DEMO_URL/${DEMO_URL}/g" $registerInfoFile

#en
indexFileEn=/usr/share/nginx/html/en/index.html
sed -i "s/https:\/\/api.elephantbi.com/${BACKEND_URL}/g" $indexFileEn
sed -i "s/DEMO_URL/${DEMO_URL}/g" $indexFileEn
sed -i "s/VIDEO_URL/${VIDEO_URL}/g" $indexFileEn
sed -i "s/https:\/\/www.xydatatech.com/${XYDATATECH_URL}/g" $indexFileEn
serverFileEn=/usr/share/nginx/html/en/service.html
sed -i "s/https:\/\/api.elephantbi.com/${BACKEND_URL}/g" $serverFileEn
sed -i "s/DEMO_URL/${DEMO_URL}/g" $serverFileEn
sed -i "s/https:\/\/www.xydatatech.com/${XYDATATECH_URL}/g" $serverFileEn
demoFileEn=/usr/share/nginx/html/en/demo.html
sed -i "s/https:\/\/api.elephantbi.com/${BACKEND_URL}/g" $demoFileEn
sed -i "s/DEMO_URL/${DEMO_URL}/g" $demoFileEn
sed -i "s/https:\/\/www.xydatatech.com/${XYDATATECH_URL}/g" $demoFileEn
priceFileEn=/usr/share/nginx/html/en/price.html
sed -i "s/https:\/\/api.elephantbi.com/${BACKEND_URL}/g" $priceFileEn
sed -i "s/DEMO_URL/${DEMO_URL}/g" $priceFileEn
sed -i "s/https:\/\/www.xydatatech.com/${XYDATATECH_URL}/g" $priceFileEn
registerFile=/usr/share/nginx/html/register.html
sed -i "s/https:\/\/api.elephantbi.com/${BACKEND_URL}/g" $registerFile
sed -i "s/DEMO_URL/${DEMO_URL}/g" $registerFile
registerInfoFile=/usr/share/nginx/html/register-info.html
sed -i "s/https:\/\/api.elephantbi.com/${BACKEND_URL}/g" $registerInfoFile
sed -i "s/DEMO_URL/${DEMO_URL}/g" $registerInfoFile

#tw
indexFileHk=/usr/share/nginx/html/hk/index.html
sed -i "s/https:\/\/api.elephantbi.com/${BACKEND_URL}/g" $indexFileHk
sed -i "s/DEMO_URL/${DEMO_URL}/g" $indexFileHk
sed -i "s/VIDEO_URL/${VIDEO_URL}/g" $indexFileHk
sed -i "s/https:\/\/www.xydatatech.com/${XYDATATECH_URL}/g" $indexFileHk
serverFileHk=/usr/share/nginx/html/hk/service.html
sed -i "s/https:\/\/api.elephantbi.com/${BACKEND_URL}/g" $serverFileHk
sed -i "s/DEMO_URL/${DEMO_URL}/g" $serverFileHk
sed -i "s/https:\/\/www.xydatatech.com/${XYDATATECH_URL}/g" $serverFileHk
demoFileHk=/usr/share/nginx/html/hk/demo.html
sed -i "s/https:\/\/api.elephantbi.com/${BACKEND_URL}/g" $demoFileHk
sed -i "s/DEMO_URL/${DEMO_URL}/g" $demoFileHk
sed -i "s/https:\/\/www.xydatatech.com/${XYDATATECH_URL}/g" $demoFileHk
priceFileHk=/usr/share/nginx/html/hk/price.html
sed -i "s/https:\/\/api.elephantbi.com/${BACKEND_URL}/g" $priceFileHk
sed -i "s/DEMO_URL/${DEMO_URL}/g" $priceFileHk
sed -i "s/https:\/\/www.xydatatech.com/${XYDATATECH_URL}/g" $priceFileHk
registerFile=/usr/share/nginx/html/register.html
sed -i "s/https:\/\/api.elephantbi.com/${BACKEND_URL}/g" $registerFile
sed -i "s/DEMO_URL/${DEMO_URL}/g" $registerFile
registerInfoFile=/usr/share/nginx/html/register-info.html
sed -i "s/https:\/\/api.elephantbi.com/${BACKEND_URL}/g" $registerInfoFile
sed -i "s/DEMO_URL/${DEMO_URL}/g" $registerInfoFile

nginx -p /usr/share/nginx -g "daemon off;"
