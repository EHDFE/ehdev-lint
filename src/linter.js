const path = require('path');
const fs = require('fs');

const eslint = require('eslint');
const init = require('./init');
const { CLIEngine } = eslint;

module.exports = (options) => {
  let runInitialization = false;
  if (options.init) {
    runInitialization = true;
  } else {
    if (!fs.existsSync(path.join(process.cwd(), '.eslintrc'))) {
      runInitialization = true;
    }
  }
  if (runInitialization) {
    init();
    return;
  }

  const cli = new CLIEngine({
  });
  const report = cli.executeOnFiles(['./src']);
  const formatter = cli.getFormatter();
  
  console.log(formatter(report.results));
};