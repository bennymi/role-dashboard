import type { Permission, Role, RoleService } from '$lib/types';

const demoRoles: Role[] = [
    {
        id: '9faaf9ba-464e-4c68-a901-630fc4de123b',
        name: 'User',
        permissions: []
    },
    {
        id: '346a3cce-49d4-4e3c-bade-a16ed44b98bb',
        name: 'Administrator',
        permissions: [
            {
                id: '706ee8e3-6034-4f27-ab20-4397ad874a09',
                type: 'read',
                name: 'Read Data'
            },
            {
                id: '72e1c7be-4c2f-4ed1-bc7b-41519b35e429',
                type: 'write',
                name: 'Write Data'
            },
            {
                id: '3add53a6-ede2-4760-8942-dbd08d209d2c',
                type: 'delete',
                name: 'Delete Data'
            }
        ]
    },
    {
        id: '6f25f789-72f3-41e2-9561-b30ca19aa225',
        name: 'Auditor',
        permissions: []
    }
];

const demoPermissions: Permission[] = [
    {
        id: '706ee8e3-6034-4f27-ab20-4397ad874a09',
        type: 'read',
        name: 'Read Data'
    },
    {
        id: '72e1c7be-4c2f-4ed1-bc7b-41519b35e429',
        type: 'write',
        name: 'Write Data'
    },
    {
        id: '3add53a6-ede2-4760-8942-dbd08d209d2c',
        type: 'delete',
        name: 'Delete Data'
    }
];

const randomTimeout = (): number => {
    const max = 1000;
    const min = 200;
    return Math.random() * (max - min) + min;
};

const delayedRandomlyRejectingPromise = <T,>(handler: () => T) => {
    return new Promise<T>((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.75) {
            // if (Math.random() > 2) {
                return reject(new Error('random error'));
            }
            try {
                resolve(handler());
            } catch (error) {
                reject(error);
            }
        }, randomTimeout());
    });
};

export class MockRoleService implements RoleService {
    private readonly roleState: Role[] = [...demoRoles];
    private readonly permissionState: Permission[] = [...demoPermissions];

    getRoles(): Promise<Role[]> {
        return delayedRandomlyRejectingPromise(() => [...this.roleState]);
    }

    getPermissions(): Promise<Permission[]> {
        return delayedRandomlyRejectingPromise(() => [...this.permissionState]);
    }

    setPermissionsForRole(roleId: string, permissions: Permission[]): Promise<Role> {
        return delayedRandomlyRejectingPromise(() => {
            const toUpdateRoleIndex = this.roleState.findIndex((r) => r.id === roleId);
            if (toUpdateRoleIndex < 0) {
                throw new Error('role not found');
            }

            const permissionIdsAreValid = permissions.every(
                (permission) => this.permissionState.findIndex((p) => p.id === permission.id) > -1
            );

            if (!permissionIdsAreValid) {
                throw new Error('invalid permissions');
            }

            this.roleState[toUpdateRoleIndex] = {
                ...this.roleState[toUpdateRoleIndex],
                permissions
            };
            
            return this.roleState[toUpdateRoleIndex];
        });
    }
}