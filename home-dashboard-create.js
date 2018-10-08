const fs = require("fs");
const path = require("path");

const arguments = process.argv;
const srcFiles = ["[file].tsx"];
const testFiles = ["[file].ts"];

const parseArgs = args => {
  const [type, ...dirNames] = args.filter(a => a.search(/^\//) !== 0);
  if (dirNames.length === 0) process.exit;
  return [type, dirNames];
};

const parsePath = type => {
  switch (type) {
    case "-a": {
      return path.resolve(__dirname, "client/components/atoms");
      break;
    }
    case "-m": {
      return path.resolve(__dirname, "client/components/molecules");
      break;
    }
    case "-o": {
      return path.resolve(__dirname, "client/components/organisms");
      break;
    }
    default: {
      process.exit;
    }
  }
};

(function init(a) {
  const [componentType, filesToWrite] = parseArgs(a);
  const componentPath = parsePath(componentType);
  const componentTypeName = componentPath.substr(
    componentPath.lastIndexOf("/") + 1,
    componentPath.length
  );

  filesToWrite.forEach(file => {
    // Write component file(s)
    if (!fs.existsSync(componentPath)) fs.mkdirSync(componentPath);
    fs.writeFileSync(
      `${componentPath}/${srcFiles[0].replace(/\[file\]/, file)}`,
      `import * as React from 'react'
import styled from 'styled-components'
export default props => <p>${file} Component</p>`
    );

    // Write component test file(s)
    const testFilesPath = `${path.resolve(__dirname, "client/__tests__")}/${
      componentTypeName
    }`;
    if (!fs.existsSync(testFilesPath)) fs.mkdirSync(testFilesPath);
    fs.writeFileSync(
      `${testFilesPath}/${testFiles[0].replace(/\[file\]/, file)}`,
      ""
    );
  });
})(arguments);