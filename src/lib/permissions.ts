/**
 * Atomic Permission Nodes
 * Standardized nodes for granular access control.
 * Format: [domain]:[resource]:[action]
 */
export const PERMISSIONS = {
  // Auth & Account
  AUTH_REGISTER: "auth:register",
  AUTH_RECOVERY: "auth:recovery",
  ACCOUNT_VIEW: "account:view",
  ACCOUNT_MODIFY: "account:modify",

  // Administration (Staff)
  ADMIN_ACCESS: "admin:access",
  ADMIN_VIEW_PLAYERS: "admin:players:view",
  ADMIN_EDIT_PLAYERS: "admin:players:modify",
  ADMIN_VIEW_LOGS: "admin:logs:view",

  // Panel Management (Master)
  PANEL_CONFIG_VIEW: "panel:config:view",
  PANEL_CONFIG_MODIFY: "panel:config:modify",
  PANEL_RBAC_VIEW: "panel:rbac:view",
  PANEL_RBAC_MODIFY: "panel:rbac:modify",
  PANEL_BRANDING: "panel:branding:modify",
  PANEL_SMTP: "panel:smtp:modify",
} as const;

export type PermissionNode = typeof PERMISSIONS[keyof typeof PERMISSIONS];

/**
 * Default Role Definitions
 * Pre-configured sets of permissions for standard roles.
 */
export const DEFAULT_ROLES = {
  USER: [
    PERMISSIONS.ACCOUNT_VIEW,
    PERMISSIONS.ACCOUNT_MODIFY,
  ],
  STAFF: [
    PERMISSIONS.ACCOUNT_VIEW,
    PERMISSIONS.ACCOUNT_MODIFY,
    PERMISSIONS.ADMIN_ACCESS,
    PERMISSIONS.ADMIN_VIEW_PLAYERS,
    PERMISSIONS.ADMIN_VIEW_LOGS,
  ],
  MASTER: Object.values(PERMISSIONS), // All permissions
};
