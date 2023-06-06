import type { UserConfig } from '@commitlint/types'
import { RuleConfigSeverity } from '@commitlint/types'

const Configuration: UserConfig = {
	// 继承的规则
	extends: ['@commitlint/config-conventional'],
	// 定义规则类型
	rules: {
		'body-leading-blank': [2, 'always'], // body换行
		'header-max-length': [2, 'never', 72], // header 最长72
		// type类型定义，表示git提交的 type 必须在以下类型范围内
		'type-enum': [
			2,
			'always',
			[
				'feat', // 新功能
				'fix', // 修复bug
				'docs', //文档注释
				'style', // 代码格式(不影响代码运行的变动)
				'regactor', // 重构(既不是增加feature，也不是修复bug)
				'perf', // 性能优化
				'test', // 增加测试
				'chore', // 构建过程或辅助工具的变更
				'revert', // 回退
				'build' // 打包
			]
		],
		// 大小写不做校验
		'subject-case': [0]
	},
	prompt: {
		settings: {},
		messages: {
			skip: ':跳过',
			max: 'upper %d chars',
			min: '%d chars at least',
			emptyWarning: '不能为空',
			upperLimitWarning: '超出限制',
			lowerLimitWarning: '少于限制'
		},
		questions: {
			type: {
				description: "Select the type of change that you're committing:",
				enum: {
					feat: {
						description: 'A new feature',
						title: 'Features',
						emoji: '✨'
					},
					fix: {
						description: 'A bug fix',
						title: 'Bug Fixes',
						emoji: '🐛'
					},
					docs: {
						description: 'Documentation only changes',
						title: 'Documentation',
						emoji: '📚'
					},
					style: {
						description:
							'Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)',
						title: 'Styles',
						emoji: '💎'
					},
					refactor: {
						description: 'A code change that neither fixes a bug nor adds a feature',
						title: 'Code Refactoring',
						emoji: '📦'
					},
					perf: {
						description: 'A code change that improves performance',
						title: 'Performance Improvements',
						emoji: '🚀'
					},
					test: {
						description: 'Adding missing tests or correcting existing tests',
						title: 'Tests',
						emoji: '🚨'
					},
					build: {
						description:
							'Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)',
						title: 'Builds',
						emoji: '🛠'
					},
					ci: {
						description:
							'Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)',
						title: 'Continuous Integrations',
						emoji: '⚙️'
					},
					chore: {
						description: "Other changes that don't modify src or test files",
						title: 'Chores',
						emoji: '♻️'
					},
					revert: {
						description: 'Reverts a previous commit',
						title: 'Reverts',
						emoji: '🗑'
					}
				}
			},
			scope: {
				description: 'What is the scope of this change (e.g. component or file name)'
			},
			subject: {
				description: 'Write a short, imperative tense description of the change'
			},
			body: {
				description: 'Provide a longer description of the change'
			},
			isBreaking: {
				description: 'Are there any breaking changes?'
			},
			breakingBody: {
				description: 'A BREAKING CHANGE commit requires a body. Please enter a longer description of the commit itself'
			},
			breaking: {
				description: 'Describe the breaking changes'
			},
			isIssueAffected: {
				description: 'Does this change affect any open issues?'
			},
			issuesBody: {
				description:
					'If issues are closed, the commit requires a body. Please enter a longer description of the commit itself'
			},
			issues: {
				description: 'Add issue references (e.g. "fix #123", "re #123".)'
			}
		}
	}
}

module.exports = Configuration
