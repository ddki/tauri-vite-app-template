<script setup lang="ts">
import { invoke } from '@tauri-apps/api/tauri'
import { onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

onMounted(() => {
	invoke('close_splashscreen')
})
</script>

<template>
	<header>
		<div class="wrapper">
			<nav>
				<RouterLink to="/">Home</RouterLink>
				<RouterLink to="/about">About</RouterLink>
			</nav>
		</div>
	</header>

	<RouterView />
</template>

<style scoped></style>
