<template>
	<h2>与 rust 交互</h2>
	<button class="bg-blue-400 text-light-100 pt-2 pb-2 pl-4 pr-4 hover:text-yellow-200" @click="btnClick">
		调用rust
	</button>
	<p>rust返回信息：{{ message }}</p>

	<h2>event</h2>
	<div class="grid gap-2 grid-cols-2 p-2">
		<button class="border-solid border-[2px] border-black" @click="globalEvent">全局事件</button>
		<button class="border-solid border-[2px] border-black" @click="listenGlobalEvent">监听全局事件</button>
		<button class="border-solid border-[2px] border-black" @click="appWindowEvent">
			appWindow-窗口事件（当前窗口）
		</button>
		<button class="border-solid border-[2px] border-black" @click="webViewWindowEvent">
			WebviewWindow-窗口事件（新窗口）
		</button>
	</div>
</template>

<script setup lang="ts">
import { invoke } from '@tauri-apps/api'
import { emit, listen } from '@tauri-apps/api/event'
import { appWindow, WebviewWindow } from '@tauri-apps/api/window'
import { ref } from 'vue'

const message = ref()
const btnClick = () => {
	invoke('greet', { name: 'World' })
		// `invoke` returns a Promise
		.then((response: any) => (message.value = response))
}

const globalEvent = () => {
	console.log('globalEvent')
	emit('click_emit', {
		message: 'Tauri is awesome!'
	})
}
const listenGlobalEvent = async () => {
	console.log('listenGlobalEvent')
	await listen('click', (event) => {
		console.log(event.event, event.payload)
	})
}

const appWindowEvent = () => {
	console.log('appWindowEvent')
	appWindow.emit('event', { message: 'Tauri is awesome!' })
}
const webViewWindowEvent = () => {
	console.log('webViewWindowEvent')
	const webview = new WebviewWindow('window')
	webview.emit('event')
}
</script>
