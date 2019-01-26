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
serverFile=/usr/share/nginx/html/service.html
sed -i "s/https:\/\/api.elephantbi.com/${BACKEND_URL}/g" $serverFile
sed -i "s/DEMO_URL/${DEMO_URL}/g" $serverFile
demoFile=/usr/share/nginx/html/demo.html
sed -i "s/https:\/\/api.elephantbi.com/${BACKEND_URL}/g" $demoFile
sed -i "s/DEMO_URL/${DEMO_URL}/g" $demoFile
priceFile=/usr/share/nginx/html/price.html
sed -i "s/https:\/\/api.elephantbi.com/${BACKEND_URL}/g" $priceFile
sed -i "s/DEMO_URL/${DEMO_URL}/g" $priceFile

#en
indexFileEn=/usr/share/nginx/html/en/index.html
sed -i "s/https:\/\/api.elephantbi.com/${BACKEND_URL}/g" $indexFileEn
sed -i "s/DEMO_URL/${DEMO_URL}/g" $indexFileEn
sed -i "s/VIDEO_URL/${VIDEO_URL}/g" $indexFileEn
serverFileEn=/usr/share/nginx/html/en/service.html
sed -i "s/https:\/\/api.elephantbi.com/${BACKEND_URL}/g" $serverFileEn
sed -i "s/DEMO_URL/${DEMO_URL}/g" $serverFileEn
demoFileEn=/usr/share/nginx/html/en/demo.html
sed -i "s/https:\/\/api.elephantbi.com/${BACKEND_URL}/g" $demoFileEn
sed -i "s/DEMO_URL/${DEMO_URL}/g" $demoFileEn
priceFileEn=/usr/share/nginx/html/en/price.html
sed -i "s/https:\/\/api.elephantbi.com/${BACKEND_URL}/g" $priceFileEn
sed -i "s/DEMO_URL/${DEMO_URL}/g" $priceFileEn

#tw
indexFileTw=/usr/share/nginx/html/tw/index.html
sed -i "s/https:\/\/api.elephantbi.com/${BACKEND_URL}/g" $indexFileTw
sed -i "s/DEMO_URL/${DEMO_URL}/g" $indexFileTw
sed -i "s/VIDEO_URL/${VIDEO_URL}/g" $indexFileTw
serverFileTw=/usr/share/nginx/html/tw/service.html
sed -i "s/https:\/\/api.elephantbi.com/${BACKEND_URL}/g" $serverFileTw
sed -i "s/DEMO_URL/${DEMO_URL}/g" $serverFileTw
demoFileTw=/usr/share/nginx/html/tw/demo.html
sed -i "s/https:\/\/api.elephantbi.com/${BACKEND_URL}/g" $demoFileTw
sed -i "s/DEMO_URL/${DEMO_URL}/g" $demoFileTw
priceFileTw=/usr/share/nginx/html/tw/price.html
sed -i "s/https:\/\/api.elephantbi.com/${BACKEND_URL}/g" $priceFileTw
sed -i "s/DEMO_URL/${DEMO_URL}/g" $priceFileTw

nginx -p /usr/share/nginx -g "daemon off;"
