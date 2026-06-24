<a class="action-card" {href}>
	<span class="badge badge--{badgeVariant}">{badge}</span>
	<h2>{title}</h2>
	<p>{description}</p>
	<span class="cta">{cta}</span>
</a>

<script lang="ts">
	type BadgeVariant = 'code' | 'lang';

	type Props = {
		href: string;
		title: string;
		description: string;
		badge: string;
		badgeVariant?: BadgeVariant;
		cta?: string;
	};

	let {
		href,
		title,
		description,
		badge,
		badgeVariant = 'code',
		cta = 'Abrir →'
	}: Props = $props();
</script>
