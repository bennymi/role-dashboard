<script lang="ts">
	import { createToaster } from '@melt-ui/svelte';
	import Toast from './toast.svelte';
	import type { ToastData, ToastType } from './types';

	const {
		elements,
		helpers: { addToast },
		states: { toasts },
		actions: { portal }
	} = createToaster<ToastData>();

	const toastColors: Record<ToastType, string> = {
		Success: 'bg-green-500',
		Warning: 'bg-orange-500',
		Error: 'bg-red-500'
	};

	export function addNewToast(type: ToastType, description: string) {
		addToast({
			data: {
				type,
				description,
				color: toastColors[type]
			}
		});
	}
</script>

<div
	class="fixed right-0 top-0 z-50 m-4 flex flex-col items-end gap-2 md:bottom-0 md:top-auto"
	use:portal
>
	{#each $toasts as toast (toast.id)}
		<Toast {elements} {toast} />
		<!-- <div
			{...$content(id)}
			use:content
			animate:flip={{ duration: 500 }}
			in:fly={{ duration: 150, x: '100%' }}
			out:fly={{ duration: 150, x: '100%' }}
			class="rounded-lg bg-neutral-800 text-white shadow-md"
		>
			<div
				class="relative flex w-[24rem] max-w-[calc(100vw-2rem)] items-center justify-between gap-4 p-5"
			>
				<div>
					<h3 {...$title(id)} use:title class="flex items-center gap-2 font-semibold">
						{data.type}
						<span class="rounded-full w-4 h-4 {data.color}" />
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
		</div> -->
	{/each}
</div>
