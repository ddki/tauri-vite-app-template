import fs from 'fs'
import c from 'kleur'

import { relativePath, LOG_PATH } from './utils'

export default function changelog(tag: string) {
	/* eslint-disable */
	const reTag = /## [\d\.]+/
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

// console.log('log == ', changelog('1.0.1'))
