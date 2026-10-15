interface CourseUnavailableRibbonProps {
  label: string;
}

/** Formal status band for courses that are not yet available. */
export default function CourseUnavailableRibbon({ label }: CourseUnavailableRibbonProps) {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
      aria-hidden
    >
      <div className="w-[140%] -rotate-12 bg-[#1a4d6f]/95 px-4 py-2.5 text-center shadow-sm ring-1 ring-white/10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white">{label}</p>
      </div>
    </div>
  );
}
