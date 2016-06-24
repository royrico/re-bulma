const csjs = require('csjs');
const fs = require('fs');
const camelCase = require('lodash.camelcase');
const path = process.argv[2];
const dist = process.argv[3];

let combinedCss = '';

const files = fs.readdirSync(path);

files.forEach(file => {
  if (!/\.css/.test(file)) return;
  combinedCss += fs.readFileSync(`${path}${file}`, { encoding: 'utf8' });
});

const csjsObj = csjs`${combinedCss}`;
const styles = {};

fs.writeFileSync(
  `${dist}css.js`,
  `module.exports = \`${csjs.getCss(csjsObj)}\`\;`
);

Object.keys(csjsObj).forEach(c => {
  styles[camelCase(c)] = csjsObj[c].toString();
});


fs.writeFileSync(
  `${dist}styles.js`,
  `module.exports = ${JSON.stringify(styles)}`
);

