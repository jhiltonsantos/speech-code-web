<a
	class="card bg-base-200 border border-base-300 no-underline text-inherit transition-all hover:border-primary hover:bg-neutral hover:-translate-y-0.5"
	{href}
>
	<div class="card-body gap-3">
		<span
			class="badge font-mono w-fit {badgeVariant === 'code' ? 'badge-accent' : 'badge-secondary'}"
		>
			{badge}
		</span>
		<h2 class="card-title text-lg">{title}</h2>
		<p class="text-base-content/70 text-sm leading-relaxed flex-1">{description}</p>
		<span class="link link-primary text-sm font-semibold no-underline">{cta}</span>
	</div>
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
