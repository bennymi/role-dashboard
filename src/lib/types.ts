export type RoleId = string;
export type PermissionId = string;

export type PermissionType = 'read' | 'write' | 'delete';

export type Permission = {
    id: PermissionId;
    type: PermissionType;
    name: string;
};

export type PermissionActive = Permission & { active: boolean };

export type PermissionIcons = Record<PermissionType, string>;

export type Role = {
    id: RoleId;
    name: string;
    permissions: Permission[];
};

export interface RoleService {
    getRoles(): Promise<Role[]>;
    getPermissions(): Promise<Permission[]>;
    setPermissionsForRole(
        roleId: RoleId,
        permissions: Permission[]
    ): Promise<Role>;
}