# web-workflow

A web workflow for a single page app

## how to use

```
npm install --dev
gulp build
or
gulp watch
```

## structure

source:
```
page
├css
│├style1.css
│└style2.css
├js
│├script1.js
│└script2.js
├template
│├template1.html
│└template2.html
├index.html
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
├sw.js
└manifest.json
```
## possibilities

All styles (in css/) are combined, auto-prefixed and minified.
All scripts (in js/) are linted, combined and minified.

The index.html can import template into the file with the syntax of module gulp-file-include.

Any other ressources are copied to the build folder
