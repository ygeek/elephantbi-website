docker stop elephantbi-website
docker build -t wang/elephantbi-website:default . && \
docker run -d --rm -p 8181:80 --name elephantbi-website wang/elephantbi-website:default
