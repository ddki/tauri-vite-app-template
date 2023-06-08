/**
 * 更新版本
 * 更新 package.json 和 src-tauri/tauri.config.json 中版本
 */
import * as fs from 'fs'
import { execSync } from 'child_process'
import k from 'kleur'

import { $argv, PACKAGE_PATH, TAURI_CONF_PATH, tauriConfJSON, packageJSON, relativePath } from './utils'

function printInfo() {
	console.log(k.blue('ℹ️ package.json version = '), packageJSON().version)
	console.log(k.blue('ℹ️ tauri.conf.json version = '), tauriConfJSON().package.version)
}
export default function version() {
	printInfo()

	// 命令
	const argv = $argv()

	console.log(k.blue('arg = '), argv)

	const tauriConfJson = tauriConfJSON()
	const packageJson = packageJSON()
	const version = tauriConfJson.package.version || '0.0.0'

	let [a, b, c] = version.split('.')?.map(Number)

	let nextVersion = version

	if (argv.major) {
		a += 1
		b = 0
		c = 0
		nextVersion = `${a}.${b}.${c}`
	} else if (argv.minor) {
		b += 1
		c = 0
		nextVersion = `${a}.${b}.${c}`
	} else if (argv.patch) {
		c += 1
		nextVersion = `${a}.${b}.${c}`
	} else if (argv.v?.length > 1) {
		nextVersion = argv.v
	}

	const oldVersion = version
	tauriConfJson.package.version = nextVersion
	packageJson.version = nextVersion

	const nextTag = `v${nextVersion}`

	// rewrite tauri.conf.json version
	fs.writeFileSync(TAURI_CONF_PATH, JSON.stringify(tauriConfJson, null, 2))
	// rewrite package.json version
	fs.writeFileSync(PACKAGE_PATH, JSON.stringify(packageJson, null, 2))

	const verChange = `(${k.yellow(oldVersion)} -> ${k.green(nextVersion)})`

	if (argv.git) {
		execSync(`git add ${relativePath(TAURI_CONF_PATH)} `)
		execSync(`git commit -m "v${nextVersion}"`)
		execSync(`git tag -a v${nextVersion} -m "v${nextVersion}"`)
		execSync(`git push`)
		execSync(`git push origin v${nextVersion}`)
		console.log(k.green('[✨ release]'), `Published successfully ${verChange}`)
	} else {
		console.log(k.green('[✨ update version]'), `package.json version ${verChange}`)
		console.log(k.green('[✨ update version]'), `tauri.conf.json version ${verChange}`)
	}
}

version()
