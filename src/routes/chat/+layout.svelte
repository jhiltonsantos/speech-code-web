<div class="layout-chat">
	{@render children()}
</div>

<script lang="ts">
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<style>
	.layout-chat {
		width: 100%;
		max-width: 720px;
		margin: 0 auto;
	}
</style>
