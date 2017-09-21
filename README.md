# web-workflow

A web workflow for a single page app

## how to use

Install dependencies
```
npm install --dev
```

Build page and start server with browser-sync
```
gulp serve
```

## structure

source:
```
page
├css
│└style1.css
├js
│└script1.js
├template
│└template1.html
├index.html
├offline.html
├sw.js
└manifest.json
```
build folder:
```
dest
├style.css
├style.min.css
├script.js
├script.min.js
├index.html
├offline.html
├sw.js
└manifest.json
```
## possibilities

All styles (in css/) are combined, auto-prefixed and minified.
All scripts (in js/) are linted, combined and minified.

The index.html can import template into the file with the syntax of module gulp-file-include.

Any other ressources are copied to the build folder.

A default service worker is present, and it is possible to list files to keep in cache.
