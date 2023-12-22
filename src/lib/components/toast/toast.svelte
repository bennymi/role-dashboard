<script lang="ts">
	import { createProgress, type Toast, type ToastsElements } from '@melt-ui/svelte';
	import { fly } from 'svelte/transition';
	import type { ToastData } from './types';
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';

	export let elements: ToastsElements;
	$: ({ content, title, description, close } = elements);

	export let toast: Toast<ToastData>;
	$: ({ data, id, getPercentage } = toast);

	const percentage = writable(0);
	const {
		elements: { root: progress },
		options: { max }
	} = createProgress({
		max: 100,
		value: percentage
	});

	onMount(() => {
		let frame: number;
		const updatePercentage = () => {
			percentage.set(getPercentage());
			frame = requestAnimationFrame(updatePercentage);
		};
		frame = requestAnimationFrame(updatePercentage);

		return () => cancelAnimationFrame(frame);
	});
</script>

<div
	{...$content(id)}
	use:content
	in:fly={{ duration: 150, x: '100%' }}
	out:fly={{ duration: 150, x: '100%' }}
	class="relative rounded-lg bg-neutral-800 text-white shadow-md"
>
	<div
		{...$progress}
		use:progress
		class="absolute left-5 top-2 h-1 w-[10%] overflow-hidden rounded-full bg-black/40"
	>
		<div
			class="h-full w-full bg-secondary"
			style={`transform: translateX(-${100 - (100 * ($percentage ?? 0)) / ($max ?? 1)}%)`}
		/>
	</div>

	<div
		class="relative flex w-[24rem] max-w-[calc(100vw-2rem)] items-center justify-between gap-4 p-5 pt-6"
	>
		<div>
			<h3 {...$title(id)} use:title class="flex items-center gap-2 font-semibold">
				{data.type}
				<span class="rounded-full w-3 h-3 {data.color}" />
			</h3>

			<div {...$description(id)} use:description>
				{data.description}
			</div>
		</div>

		<button
			{...$close(id)}
			use:close
			class="absolute right-4 top-4 grid place-items-center rounded-full text-white hover:bg-primary/70"
		>
			<span class="text-xl i-material-symbols-close-rounded" />
		</button>
	</div>
</div>
