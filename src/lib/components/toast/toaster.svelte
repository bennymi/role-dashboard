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
	{/each}
</div>
