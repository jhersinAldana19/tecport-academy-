import type { UserRole } from '@/contexts/AuthContext';

/**
 * Temporary access rules for the design prototype while technicians
 * only need Hidráulica Avanzada (2 SharePoint videos).
 * Flip these when the full Academy (backend) is ready.
 */
export const TEMP_ACCESS = {
  /** Admin panel and admin role are off. */
  adminEnabled: false,
  /** Public Academy course cards are visible but cannot be opened. */
  publicCoursesEnterable: false,
  /** Role used on first load for technicians. */
  defaultRole: 'tecport_staff' as UserRole,
  /** Roles shown in the header switcher. */
  selectableRoles: ['guest', 'student', 'tecport_staff'] as UserRole[],
} as const;
