"use strict";
exports.__esModule = true;
/**
 * 更新版本
 * 更新 package.json 和 src-tauri/tauri.config.json 中版本
 */
var fs = require("fs");
var utils_1 = require("./utils");
var packageJsonStr = fs.readFileSync(utils_1.PACKAGE_PATH, 'utf-8');
var packageJson = JSON.parse(packageJsonStr);
console.log(packageJson.version);
