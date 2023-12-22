<script lang="ts">
	import { createTooltip } from '@melt-ui/svelte';
	import { fly, slide } from 'svelte/transition';

	import type { Permission } from '../types';

	/** The permission to be shown. */
	export let permission: Permission;
	/** Whether the permission is active. */
	export let active: boolean;
	/** The icon to display. */
	export let icon: string;

	const {
		elements: { trigger, content, arrow },
		states: { open }
	} = createTooltip({
		positioning: {
			placement: 'top'
		},
		openDelay: 0,
		closeDelay: 0,
		closeOnPointerDown: false,
		forceVisible: true
	});
</script>

{#if active}
	<button
		{...$trigger}
		use:trigger
		class="bg-primary text-on-primary inline-flex justify-center items-center rounded-sm p-1"
		aria-label="{permission.name} permission"
		transition:slide={{ axis: 'x' }}
	>
		<span class="text-lg transition-all {icon}" />
	</button>
{/if}

{#if $open}
	<div
		{...$content}
		use:content
		in:fly={{ duration: 100, y: 10 }}
		class="z-10 rounded-sm shadow-lg bg-popover-surface text-on-popover-surface"
	>
		<div {...$arrow} use:arrow />
		<p class="px-4 py-1">{permission.name}</p>
	</div>
{/if}
