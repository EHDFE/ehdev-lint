module.exports = {
  'es6+': {
    dep: {
      name: 'eslint-config-airbnb-base',
      version: 'latest',
    },
    template: `{
  "extends": "airbnb-base",
  "globals": {
    "window": true,
    "document": true
  }
}`,
  },
  'es5': {
    deps: {
      name: 'eslint-config-airbnb-base',
      version: 'latest',
    },
    template: `{
  "extends": "airbnb-base/legacy",
  "globals": {
    "window": true,
    "document": true
  }
}`,
  },
  'angular': {
    deps: [
      {
        name: 'eslint',
        version: 'latest',
      },
      {
        name: 'eslint-plugin-angular',
        version: 'latest',
      }
    ],
    template: `{
  "plugins": [ "angular" ],
  "rules": {
    "angular/controller-name": [ 2, "/[A-Z].*Controller$/" ]
  },
  "globals": {
    "angular": true,
    "window": true,
    "document": true
  },
  "settings": 1
}`,
  },
  'react': {
    dep: {
      name: 'eslint-config-airbnb',
      version: 'latest',
    },
    template: `{
  "extends": "airbnb",
  "globals": {
    "window": true,
    "document": true
  }
}`,
  },
};