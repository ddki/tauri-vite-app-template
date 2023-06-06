/**
 * 更新版本
 * 更新 package.json 和 src-tauri/tauri.config.json 中版本
 */
import * as fs from 'fs'
import { $argv, PACKAGE_PATH, TAURI_CONF_PATH } from './utils'

let packageJsonStr = fs.readFileSync(PACKAGE_PATH, 'utf-8')

let packageJson = JSON.parse(packageJsonStr)

console.log(packageJson.version)
