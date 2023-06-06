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
				'refactor', // 重构(既不是增加feature，也不是修复bug)
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
				description: '请选择提交类型:',
				enum: {
					feat: {
						description: '新功能、新特性',
						title: '新功能',
						emoji: '✨'
					},
					fix: {
						description: '修复Bug',
						title: '修复Bug',
						emoji: '🐛'
					},
					docs: {
						description: '文档变更',
						title: '文档',
						emoji: '📚'
					},
					style: {
						description: '代码格式(不影响代码运行的变动)',
						title: '格式',
						emoji: '💎'
					},
					refactor: {
						description: '重构(既不是增加feature，也不是修复bug)',
						title: '重构',
						emoji: '📦'
					},
					perf: {
						description: '性能优化',
						title: '性能优化',
						emoji: '🚀'
					},
					test: {
						description: '增加测试活着改正现有测试',
						title: '测试',
						emoji: '🚨'
					},
					build: {
						description: '更改打包工具或者外部依赖项',
						title: 'Builds',
						emoji: '🛠'
					},
					ci: {
						description: '更改CI配置文件或者脚本',
						title: 'CI',
						emoji: '⚙️'
					},
					chore: {
						description: '其他变更，不修改src和test文件',
						title: 'Chores',
						emoji: '♻️'
					},
					revert: {
						description: '回退上一个提交',
						title: 'Reverts',
						emoji: '🗑'
					}
				}
			},
			header: {
				description: '输入header'
			},
			scope: {
				description: '本次更改的范围：(e.g. component or file name)'
			},
			subject: {
				description: '写一个简短的、命令式的变化描述'
			},
			body: {
				description: '提供一个较长的变化描述'
			},
			isBreaking: {
				description: '是否有任何突破性变化？'
			},
			breakingBody: {
				description: '一个BREAKING CHANGE的提交需要一个正文。请输入对该提交本身的较长描述'
			},
			breaking: {
				description: '描述突破性的变化'
			},
			isIssueAffected: {
				description: '这一变化是否影响到任何未解决的 issue？'
			},
			issuesBody: {
				description: '如果 issue 被关闭，提交需要一个正文。请输入对该提交本身的较长描述'
			},
			issues: {
				description: '添加 issue 引用 (e.g. "fix #123", "re #123".)'
			}
		}
	}
}

module.exports = Configuration
