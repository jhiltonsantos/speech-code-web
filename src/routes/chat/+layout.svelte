<div class="w-full max-w-[720px] mx-auto">
	{@render children()}
</div>

<script lang="ts">
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>
