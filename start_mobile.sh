docker stop elephantbi-website-mobile
docker build -t wang/elephantbi-website-mobile:default -f Dockerfile-mobile . && \
docker run -d --rm -p 8182:80 --name elephantbi-website-mobile wang/elephantbi-website-mobile:default
