- evaluate autodll plugin
- use polyfill.io?
- find out which part of production build process creates -emotion-css files in /dist/client
- cache public files in serviceworker, cache service worker start_url. 
- integrate react-error-overlay from CRA or whatever ives van hoorne did for codesandbox

- once babel 7 is out, switch to .babelrc.js and add a comment on the dev environment plugins and their order: when we do hot reloading combined with preset-env for environments that natively support ecmascript 6 classes, react-hot-loader fucks up so that atleast setState doesn't work anymore. therefore, when using react-hot-loader, we need transform-es2015-classes to have classes transformed regardless. because we transform class properties with another plugin, that needs to be included aswell and put in the right order so class properties are transformed first before classes are. related hot-loader issue: https://github.com/gaearon/react-hot-loader/issues/313
