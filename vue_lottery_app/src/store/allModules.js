function camelCase(str) {
  const strDashed = str.replace(/\s+/g, "-").toLowerCase();
  return strDashed.replace(/-([a-z])/g, g => g[1].toUpperCase());
}

// It allows you to pass in a directory to search,
// a flag indicating whether subdirectories should be searched too,
// and a regular expression to match files against.
// The syntax is as follows:
// require.context(directory, useSubdirectories = false, regExp = /^\.\//)
const requireModule = require.context("./modules", true, /\.js$/);
const modules = {};

requireModule.keys().forEach(fileName => {
  // If file is index.js return
  if (fileName === "./index.js") return;

  const moduleName = camelCase(fileName.replace(/(\.\/|\.js)/g, ""));

  // We get the inner object called default,
  // so an object is created in the following way
  // {
  //   moduleName: {
  //       state:{}, etc
  //   },
  //   moduleName: {
  //       state:{}, etc
  //   }
  // }
  modules[moduleName] = {
    ...requireModule(fileName).default
  };
});

export default modules;
