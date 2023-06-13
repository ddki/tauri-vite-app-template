import fs from 'fs'
import c from 'kleur'

import { $argv, relativePath, LOG_PATH, UPDATE_LOG_PATH, packageJSON } from './utils'
import path from 'path'

export default function changelog(tag: string) {
	/* eslint-disable */
	const reTag = /## \[[\d\.]+\]/
	/* eslint-disable */
	const reVersion = /[\d\.]+/

	let filePath = LOG_PATH

	if (!fs.existsSync(filePath) && !fs.existsSync(LOG_PATH)) {
		console.log(c.red('[💢 changelog]'), `Could not found ${c.yellow('CHANGE_LOG.md')}`)
		process.exit(0)
	}

	let _tag: string | null
	const tagMap: Record<string, any> = {}
	const content = fs.readFileSync(filePath, 'utf8').split('\n')

	content.forEach((line, index) => {
		if (reTag.test(line)) {
			_tag = line.slice(3).trim()
			_tag = line.match(reVersion)?.[0] || _tag
			if (!tagMap[_tag]) {
				tagMap[_tag] = []
				return
			}
		}
		if (_tag) {
			tagMap[_tag].push(line.trim())
		}
		if (reTag.test(content[index + 1])) {
			_tag = null
		}
	})

	if (!tagMap?.[tag]) {
		console.log(c.red('[💢 changelog]'), c.yellow(relativePath(filePath)), `Tag ${tag} does not exist.`)
		process.exit(0)
	}

	return {
		filename: relativePath(filePath),
		content: tagMap[tag].join('\n').trim() || ''
	}
}

export function changelogs() {
	const argv = $argv()
	let versions = new Array()
	if (argv.version && argv.version.length > 0) {
		argv.version.split(' ').forEach((v) => {
			versions.push(v)
		})
	} else {
		versions.push(packageJSON().version)
	}
	let content = ''
	versions.forEach((v) => {
		content += changelog(v).content
	})

	const filename = UPDATE_LOG_PATH
	if (!fs.existsSync(path.dirname(filename))) {
		fs.mkdirSync(path.dirname(filename), { recursive: true })
	}
	fs.writeFileSync(filename, content)
}

changelogs()
