# Interactive 3D Points

## Tech stack
 - `babel`
 - `postcss`
 - `webapck 3`
 - `eslint and stylelint`
 - `pre-commit hooks`


## Project Structure
```
|-- config                         // project config folder
|  |-- helpers.js                    // helper functions
|  |-- webpack.common.js             // common webpack config
|  |-- webpack.dev.js                // extend common config for dev build
|  |-- webpack.prod.js               // extend common config for prod build

|-- src                           // source code
|  |-- css                          //
|  |  |-- index.css                 // styles entry point
|  |-- images                       //
|  |-- js                           //
|  |  |-- index.js                  // app entry point
|  |  |-- polyfills.js              // polyfills

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
- `npm run build` - assemble production build
- `npm run lint` - code style check
- `npm run lint-js` - js code style check
- `npm run lint-css` - css code style check
