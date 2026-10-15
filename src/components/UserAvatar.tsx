import { getStaffUserInitials } from '@/data/staffUsers';

interface UserAvatarProps {
  fullName: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-12 w-12 text-sm',
  lg: 'h-20 w-20 text-xl',
} as const;

/** Initials avatar (no photo upload in this temporary build). */
export default function UserAvatar({ fullName, size = 'md' }: UserAvatarProps) {
  return (
    <div
      className={`inline-flex items-center justify-center rounded-full bg-[#003558] font-semibold text-white ${sizeClasses[size]}`}
      aria-hidden
    >
      {getStaffUserInitials(fullName)}
    </div>
  );
}
