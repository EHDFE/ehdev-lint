const fs = require('fs');
const path = require('path');

exports.updatePkg = (root, pkgs, propName) => new Promise((resolve, reject) => {
  
  const pkgFile = path.join(root, 'package.json');
  const pkg = require(pkgFile);
  const propDep = pkg[propName] || {};

  for (const item of pkgs) {
    const itemPkg = require(path.join(root, 'node_modules', item.name, 'package.json'));
    propDep[itemPkg.name] = `^${itemPkg.version}`;
  }

  const newDeps = {};
  for (const key of Object.keys(propDep).sort()) {
    newDeps[key] = propDep[key];
  }
  pkg[propName] = newDeps;
  fs.writeFile(pkgFile, JSON.stringify(pkg, null, 2) + '\n', (err, data) => {
    if (err) return reject(err);
    resolve();
  });
});

exports.writeRcFile = (root, content) => new Promise((resolve, reject) => {
  const rcFile = path.join(root, '.eslintrc');
  fs.writeFile(rcFile, content, (err, data) => {
    if (err) return reject(err);
    resolve();
  });
});