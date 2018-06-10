# `Awesome HTC Project Stub`

## Tech stack
 - `babel`
 - `postcss`
 - `webapck 2`
 - `json-server`
 - `eslint and stylelint`
 - `pre-commit hooks`

## Notes
because we want build each resource in separate folder all `svg` file names should be suffixed with `'font.svg'` or `'img.svg'` strings.


## Project Structure
```
|-- config                         // project config folder
|  |-- helpers.js                    // helper functions
|  |-- webpack.common.js             // common webpack config
|  |-- webpack.dev.js                // extend common config for dev build
|  |-- webpack.prod.js               // extend common config for prod build

|-- server                        // server mocking client-server interraction
|  |-- db.json                      // data base. see https://github.com/typicode/json-server

|-- src                           // source code
|  |-- css                          //
|  |  |-- index.css                 // styles entry point
|  |-- fonts                        //
|  |  |-- some font folder          //
|  |  |-- index.css                 // font css entry point
|  |  |-- font itself               // name `should be suffixed` with `.font` str:  `font_name.font.(ttf|woff|woff2|eot|svg)`
|  |-- images                       // svg images `should be suffixed` with `.img` str: `img_name.img.svg`
|  |-- js                           //
|  |  |-- index.js                  // app entry point
|  |  |-- polyfills.js              // polyfills
|  |-- static                       // some static files
|  |-- index.html                   // template (used by https://github.com/jantimon/html-webpack-plugin)

|-- .babelrc                        //
|-- .editorconfig                   //
|-- .eslintrc                       // eslint configuration
|-- .gitignore                      //
|-- build.js                        // build production script
|-- package.json                    //
|-- README.md                       //
|-- postcss.config.js               //
|-- start.js                        // build development script
|-- stylelint.config.js             //  configuration
|-- webpack.config.js               // webpack configuration entry point
|-- yarn.lock

|-- build                         // build folder
|  |-- assets                       // browser assembled assets
|  |  |-- css                       //
|  |  |-- fonts                     //
|  |  |-- images                    //
|  |  |-- js                        //
|  |-- static                       // some static files
|  |-- index.html                   //
```

## npm scripts
- `npm start or npm run start` - assemble dev build and launch dev server at http://localhost:8080/
- `npm run start-server` - launch json-server at http://localhost:3000/
- `npm run build` - assemble production build
- `npm run lint` - code style check
- `npm run lint-js` - js code style check
- `npm run lint-css` - css code style check
