const checker = require('license-checker');
const path = require('path');
const assert = require('assert');

const allowedLicenses = [
  '(BSD-2-Clause OR MIT OR Apache-2.0)',
  '(MIT AND CC-BY-3.0)',
  '(MIT OR Apache-2.0)',
  '(MIT OR CC0-1.0)',
  'AFLv2.1',
  'Apache-2.0',
  'BSD',
  'BSD*',
  'BSD-2-Clause',
  'BSD-3-Clause',
  'CC-BY-3.0',
  'CC0-1.0',
  'ISC',
  'MIT',
  'MIT*',
  'Unlicense',
  'WTFPL',
];

checker.init({
  start: path.join(__dirname, '..'),
}, (err, packages) => {
  if (err) {
    console.log(err);
    process.exit(1);
  } else {
    const licenses = [
      ...new Set(Object
        .keys(packages)
        .map((pkgName) => packages[pkgName].licenses)
        .flat()),
    ];
    licenses.forEach((license) => {
      assert(allowedLicenses.indexOf(license) !== -1, `License ${license} not whitelisted`);
    });
  }
  console.log('License check passed');
});
