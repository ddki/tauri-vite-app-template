<template>
	<h2>与 rust 交互</h2>
	<button class="bg-blue-400 text-light-100 pt-2 pb-2 pl-4 pr-4 hover:text-yellow-200" @click="btnClick">
		调用rust
	</button>
	<p>rust返回信息：{{ message }}</p>
</template>

<script setup lang="ts">
import { invoke } from '@tauri-apps/api'
import { ref } from 'vue'

const message = ref()
const btnClick = () => {
	invoke('greet', { name: 'World' })
		// `invoke` returns a Promise
		.then((response: any) => (message.value = response))
}
</script>
