<header class="mb-5 {className}">
	<a class="link link-hover text-sm text-base-content/60 mb-2 inline-block no-underline" href={backHref}>
		{backLabel}
	</a>
	<h1 class="text-2xl font-semibold m-0">{title}</h1>
</header>

<script lang="ts">
	type Props = {
		title: string;
		backHref?: string;
		backLabel?: string;
		class?: string;
	};

	let { title, backHref = '/', backLabel = '← Início', class: className = '' }: Props = $props();
</script>
