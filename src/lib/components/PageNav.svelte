<header class="page-nav">
	<a class="page-nav__back" href={backHref}>{backLabel}</a>
	<h1 class="page-nav__title">{title}</h1>
</header>

<script lang="ts">
	type Props = {
		title: string;
		backHref?: string;
		backLabel?: string;
	};

	let { title, backHref = '/', backLabel = '← Início' }: Props = $props();
</script>
