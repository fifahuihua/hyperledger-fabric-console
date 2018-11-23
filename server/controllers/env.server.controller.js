'use strict';
const shell = require('shelljs');
const { exec } = require('child_process');

const checkDockerVersion = function (req, res) {
  const dockerVersionPrefix = 'Docker version ';
  const minVersion = 17.06;
  let version = shell.exec('docker --version', { silent: true }).stdout;
  console.log(`docker version: ${version}`);
  if (version && version.startsWith(dockerVersionPrefix)) {
    version = version.substring(dockerVersionPrefix.length, dockerVersionPrefix.length + 5);
    if (parseFloat(version) >= minVersion) {
      return res.json({ result: 'success', version });
    }
  }
  return res.json({ result: 'fail', version });
};

const checkComposerVersion = function (req, res) {
  const dockerComposeVersionPrefix = 'docker-compose version ';
  const minVersion = 1.14;
  let version = shell.exec('docker-compose --version', { silent: true }).stdout;
  console.log(`docker-compose version: ${version}`);
  if (version && version.startsWith(dockerComposeVersionPrefix)) {
    version = version.substring(dockerComposeVersionPrefix.length, dockerComposeVersionPrefix.length + 4);
    if (parseFloat(version) >= minVersion) {
      return res.json({ result: 'success', version });
    }
  }
  return res.json({ result: 'fail', version });
};

const checkGolangVersion = function (req, res) {
  const goVersionPrefix = 'go version go';
  const minVersion = 1.11;
  let version = shell.exec('go version', { silent: true }).stdout;
  console.log(`go version: ${version}`);
  if (version && version.startsWith(goVersionPrefix)) {
    version = version.substring(goVersionPrefix.length, goVersionPrefix.length + 4);
    if (parseFloat(version) >= minVersion) {
      return res.json({ result: 'success', version });
    }
  }
  return res.json({ result: 'fail', version });
};

const checkPythonVersion = function (req, res) {
  const pythonVersionPrefix = 'Python ';
  const minVersion = 2.7;
  exec('python -V', (error, stdout, version) => {
    console.log(`python version: ${version}`);
    if (version && version.startsWith(pythonVersionPrefix)) {
      version = version.substring(pythonVersionPrefix.length, pythonVersionPrefix.length + 3);
      if (parseFloat(version) === minVersion) {
        return res.json({ result: 'success', version });
      }
    }
    return res.json({ result: 'fail', version });
  });
};

const checkNodejsVersion = function (req, res) {
  const nodejsVersionPrefix = 'v';
  const minVersion = 8;
  let version = shell.exec('node -v', { silent: true }).stdout;
  console.log(`nodejs version: ${version}`);
  if (version && version.startsWith(nodejsVersionPrefix)) {
    version = version.substring(nodejsVersionPrefix.length).split('.')[0];
    if (parseFloat(version) >= minVersion) {
      return res.json({ result: 'success', version });
    }
  }
  return res.json({ result: 'fail', version });
};

const checkVersion = function (req, res) {
  const appType = req.params.appType;
  return {
    docker: checkDockerVersion,
    composer: checkComposerVersion,
    go: checkGolangVersion,
    python: checkPythonVersion,
    nodejs: checkNodejsVersion
  }[appType](req, res);
};

module.exports = {
  checkVersion
}