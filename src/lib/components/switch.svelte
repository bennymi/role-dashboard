<script lang="ts">
	import { createSwitch } from '@melt-ui/svelte';
	import { generateId } from '@melt-ui/svelte/internal/helpers';

	/** Set the toggle text. */
	export let label: string;
	/** The name of the hidden input element used for form submission. */
	export let name = '';
	/** Bind to the checked status of the switch. */
	export let checked = false;

	const {
		elements: { root, input },
		states: { checked: switchChecked }
	} = createSwitch({ name, defaultChecked: checked });

	let uniqueId = generateId();

	/** Update outside facing props. */
	$: checked = $switchChecked;

	/** Styles. */
	$: bgClasses = $switchChecked ? 'bg-primary' : 'bg-gray';
</script>

<form>
	<div class="flex items-center">
		<button
			{...$root}
			use:root
			class="relative w-11 h-6 cursor-default rounded-full transition-colors {bgClasses}"
			id={uniqueId}
		>
			<span
				class="flex justify-center items-center w-5 h-5 translate-x-0.5 rounded-full bg-white transition-transform will-change-transform {$switchChecked
					? 'translate-x-5.5'
					: ''}"
			/>
		</button>
		<input {...$input} use:input />

		{#if label}
			<label class="select-none pl-2" for={uniqueId}>{label}</label>
		{/if}
	</div>
</form>
