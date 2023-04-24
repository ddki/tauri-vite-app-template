module.exports = {
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
	}
}
