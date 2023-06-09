module.exports = {
	plugins: {
		'@release-it/conventional-changelog': {
			writerOpts: {},
			infile: 'CHANGELOG.md',
			preset: {
				name: 'angular',
				header: '# 📄 更新日志',
				types: [
					{
						type: 'feat',
						section: '✨ 新增功能'
					},
					{
						type: 'fix',
						section: '🐛 修复缺陷'
					}
				]
			}
		},
		// 读写版本
		'@release-it/bumper': {
			out: [
				{
					file: 'package.json',
					path: 'version'
				},
				{
					file: './src-tauri/tauri.conf.json',
					path: 'package.version'
				}
			]
		}
	}
}
