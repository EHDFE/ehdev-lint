const inquirer = require('inquirer');
const packageJson = require('package-json');
const co = require('co');
const npminstall = require('npminstall');

const { updatePkg, writeRcFile } = require('./util');
const rcTpl = require('./rc-template');
const PROJECT_DIR = process.cwd();

module.exports = () => {
  const prompt = inquirer.createPromptModule();
  prompt([
    {
      type: 'list',
      name: 'type',
      message: 'Please select your project type.',
      default: 'es6+',
      choices: [
        'es6+',
        'es5',
        'angular',
        'react',
      ],
    },
  ]).then(answers => {
    const rcConfig = rcTpl[answers.type];
    switch (answers.type) {
      case 'es6+':
      case 'es5':
      case 'react':
      default:
        packageJson(rcConfig.dep.name, {
          version: rcConfig.dep.version,
        }).then(pkg => {
          const pkgs = [ rcConfig.dep ].concat(
            Object.keys(pkg.peerDependencies).map(name => ({
              name,
              version: pkg.peerDependencies[name],
            }))
          );
          co(function *() {
            yield npminstall({
              root: PROJECT_DIR,
              pkgs,
              production: true,
              registry: 'https://registry.npm.taobao.org',
            })
          }).then(() => {
            // write dep to package.json
            writeRcFile(PROJECT_DIR, rcConfig.template);
            updatePkg(PROJECT_DIR, pkgs, 'devDependencies');
          }).catch(err => {
            console.error(err.stack);
          });
        });
        break;
      case 'angular':
        const pkgs = rcConfig.deps;
        co(function *() {
          yield npminstall({
            root: PROJECT_DIR,
            pkgs,
            production: true,
            registry: 'https://registry.npm.taobao.org',
          })
        }).then(() => {
          // write dep to package.json
          writeRcFile(PROJECT_DIR, rcConfig.template);
          updatePkg(PROJECT_DIR, pkgs, 'devDependencies');
        }).catch(err => {
          console.error(err.stack);
        });
        break;
    }
  });
};