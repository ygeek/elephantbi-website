const allLocales = require('./locales.json')
const fs = require('fs')


let data = fs.readFileSync('/usr/share/nginx/html/en/index.html', {
  encoding: 'utf-8'
})

for(const key in allLocales) {
  const re =new RegExp("#" + key + "#","g");
  data = data.replace(re, allLocales[key]["en-US"])
}

fs.writeFileSync('/usr/share/nginx/html/en/index.html', data)