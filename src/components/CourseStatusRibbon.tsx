type CourseStatusRibbonVariant = 'unavailable' | 'available';

interface CourseStatusRibbonProps {
  label: string;
  variant?: CourseStatusRibbonVariant;
}

const variantStyles: Record<CourseStatusRibbonVariant, string> = {
  /** Brand navy — courses not ready yet */
  unavailable: 'bg-[#003558]/95 ring-white/10',
  /** Accent orange — course ready to open */
  available: 'bg-accent/95 ring-white/15',
};

/** Formal diagonal status band for course card imagery. */
export default function CourseStatusRibbon({
  label,
  variant = 'unavailable',
}: CourseStatusRibbonProps) {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
      aria-hidden
    >
      <div
        className={`w-[140%] -rotate-12 px-4 py-2.5 text-center shadow-sm ring-1 ${variantStyles[variant]}`}
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white">{label}</p>
      </div>
    </div>
  );
}
