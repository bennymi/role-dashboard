<script lang="ts">
	import { onMount } from 'svelte';

	import { PermissionDialog, PermissionIcon, Toaster } from '$lib';
	import type { Permission, PermissionIcons, Role } from '$lib/types';
	import { MockRoleService } from '.';

	let service = new MockRoleService();
	let roles: Role[] = [];
	let permissions: Permission[] = [];
	let error = '';
	let init = false;
	let toaster: Toaster;

	const icons: PermissionIcons = {
		read: 'i-material-symbols-visibility-rounded',
		write: 'i-material-symbols-edit-rounded',
		delete: 'i-material-symbols-delete-rounded'
	};

	onMount(async () => {
		const errorMessage =
			'Error: Failed to fetch roles or permissions. Please try again or open a support ticket.';

		try {
			roles = await service.getRoles();
		} catch (e) {
			error = errorMessage;
		}

		try {
			permissions = await service.getPermissions();
		} catch (e) {
			error = errorMessage;
		}

		init = true;
	});

	async function updateRolePermissions(role: Role, updatedPermissions: Permission[]) {
		try {
			const newRole = await service.setPermissionsForRole(role.id, updatedPermissions);

			roles = roles.map((role) => {
				if (role.id != newRole.id) {
					return role;
				}

				return newRole;
			});

			toaster.addNewToast('Success', `Permissions were updated for the ${role.name} role.`);
		} catch (e) {
			toaster.addNewToast(
				'Error',
				`An error occurred. Permissions couldn't be updated. Please try again or create a support ticket.`
			);
		}
	}
</script>

<h2 class="text-center font-bold text-2xl mt-20 mb-6">Roles & Permissions</h2>

{#if error}
	<div class="text-white bg-error rounded-md px-2 py-1 w-fit font-semibold m-auto">{error}</div>
{:else if init}
	<div class="m-auto w-[320px] flex flex-col">
		{#each roles as role (role.id)}
			<div class="py-1 px-1 flex justify-between gap-4 border-b border-popover-surface/30">
				<div class="flex gap-2">
					<PermissionDialog
						{role}
						{permissions}
						on:save={(e) => updateRolePermissions(role, e.detail)}
					/>

					<div class="font-semibold min-w-40 py-1">{role.name}</div>
				</div>

				<div class="flex gap-2 items-end justify-center">
					{#each permissions as permission}
						{@const active = role.permissions.some((v) => v.id === permission.id)}

						<PermissionIcon {permission} {active} icon={icons[permission.type]} />
					{/each}
				</div>
			</div>
		{/each}
	</div>
{/if}

<Toaster bind:this={toaster} />
