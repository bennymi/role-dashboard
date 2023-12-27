<script lang="ts">
	import { createDialog } from '@melt-ui/svelte';
	import type { Permission, PermissionActive, Role } from '../types';
	import { fade, fly } from 'svelte/transition';

	import Switch from './switch.svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import type { MeltEventHandler } from '@melt-ui/svelte/internal/types';

	const dispatcher = createEventDispatcher();

	/** The role to be shown. */
	export let role: Role;
	/** The permissions to be shown. */
	export let permissions: Permission[];

	let newPermissions: PermissionActive[];

	/**
	 * Maps the current active state of each permission for a role, and adds
	 * it as a separate 'active' attribute.
	 */
	const getPermissionActiveStates = () =>
		permissions.map((permission) => {
			const active = role.permissions.some((v) => v.id === permission.id);

			return {
				...permission,
				active
			};
		});

	onMount(() => {
		newPermissions = getPermissionActiveStates();
	});

	// Create a dialog melt component.
	const {
		elements: { trigger, overlay, content, title, description, close },
		states: { open }
	} = createDialog({
		forceVisible: true
	});

	/**
	 * Dispatch a 'save' event when the save button is clicked.
	 * @param e - The event emitted by melt-ui.
	 */
	const handleSave: MeltEventHandler<MouseEvent | KeyboardEvent> = (e) => {
		if (e.detail.originalEvent instanceof KeyboardEvent && e.detail.originalEvent.key != 'Enter') {
			return;
		}

		const updated = newPermissions.filter((v) => v.active).map(({ active, ...rest }) => rest);

		dispatcher('save', updated);
	};

	// Rerun the getPermissionActiveStates() every time the dialog is opened.
	$: if ($open) {
		newPermissions = getPermissionActiveStates();
	}
</script>

<button
	{...$trigger}
	use:trigger
	class="inline-flex items-center justify-center transition-all hover:(scale-120 text-primary) focus:(outline-offset-1 outline-1)"
	aria-label="change role permissions"
>
	<span class="text-xl i-material-symbols-settings-account-box-rounded" />
</button>

{#if $open}
	<div
		{...$overlay}
		use:overlay
		class="fixed inset-0 z-50 bg-black/50"
		transition:fade={{ duration: 150 }}
	/>
	<div
		{...$content}
		use:content
		class="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw]
            max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white p-6 shadow-lg"
		transition:fly={{
			duration: 150,
			y: 8
		}}
	>
		<h2 {...$title} use:title class="m-0 text-lg font-semibold text-black">
			Edit
			<span class="text-primary">
				{role.name}
			</span>
			Permissions
		</h2>

		<p {...$description} use:description class="mb-5 mt-2 leading-normal text-zinc-600">
			Make changes to the role permissions here. Click save when you're done.
		</p>

		<fieldset class="flex flex-col pl-2 gap-4">
			{#each newPermissions as permission}
				<Switch label={permission.name} bind:checked={permission.active} />
			{/each}
		</fieldset>

		<div class="mt-6 flex justify-end gap-4">
			<button
				{...$close}
				use:close
				class="inline-flex h-8 items-center justify-center rounded-sm px-4 font-medium leading-none transition-all bg-gray-500 text-white hover:(bg-gray-600)"
			>
				Cancel
			</button>

			<button
				{...$close}
				use:close
				class="inline-flex h-8 items-center justify-center rounded-sm px-4 font-medium leading-none transition-all bg-primary/80 text-on-primary hover:(bg-primary)"
				on:m-click={(e) => handleSave(e)}
				on:m-keydown={(e) => handleSave(e)}
			>
				Save
			</button>
		</div>

		<button
			{...$close}
			use:close
			aria-label="close"
			class="absolute right-4 top-4 inline-flex appearance-none items-center justify-center rounded-full p-1"
		>
			<span class="text-xl i-material-symbols-close-rounded" />
		</button>
	</div>
{/if}
