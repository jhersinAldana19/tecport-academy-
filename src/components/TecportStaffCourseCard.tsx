import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import CourseStatusRibbon from '@/components/CourseStatusRibbon';
import { useLanguage } from '@/contexts/LanguageContext';
import type { TecportStaffCourseLevelFilter } from '@/data/tecportStaffCourses';

const levelColors: Record<'Basic' | 'Intermediate' | 'Advanced', string> = {
  Basic: 'bg-secondary text-secondary-foreground',
  Intermediate: 'bg-primary text-primary-foreground',
  Advanced: 'bg-accent text-accent-foreground',
};

const filterToCourseLevel: Record<TecportStaffCourseLevelFilter, keyof typeof levelColors> = {
  basic: 'Basic',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

export interface TecportStaffCourseCardProps {
  courseId: string;
  imageSrc: string;
  title: string;
  subtitle: string;
  duration: string;
  levelLabel: string;
  levelFilter: TecportStaffCourseLevelFilter;
  /** When true, card navigates to the staff learning view. */
  hasContent: boolean;
}

export default function TecportStaffCourseCard({
  courseId,
  imageSrc,
  title,
  subtitle,
  duration,
  levelLabel,
  levelFilter,
  hasContent,
}: TecportStaffCourseCardProps) {
  const { t } = useLanguage();
  const levelKey = filterToCourseLevel[levelFilter];

  const body = (
    <>
      <div className="relative aspect-[5/4] overflow-hidden">
        <img
          src={imageSrc}
          alt={title}
          className={`h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
            hasContent ? '' : 'brightness-75'
          }`}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-foreground/20" />
        {hasContent ? (
          <CourseStatusRibbon label={t('course.availableNow')} variant="available" />
        ) : (
          <CourseStatusRibbon label={t('course.underConstruction')} variant="unavailable" />
        )}
        <span className={`absolute left-3 top-3 z-20 rounded px-2 py-0.5 text-xs font-semibold ${levelColors[levelKey]}`}>
          {levelLabel}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-sm font-semibold leading-tight text-foreground">{title}</h3>
        <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{subtitle}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3 shrink-0" aria-hidden />
            {duration}
          </span>
          <span
            className={`text-xs font-semibold ${
              hasContent
                ? 'text-accent transition-colors group-hover:underline group-hover:decoration-accent group-hover:underline-offset-4'
                : 'text-muted-foreground'
            }`}
          >
            {hasContent ? `${t('course.viewCourse')} →` : t('course.comingSoon')}
          </span>
        </div>
      </div>
      <div className="h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full" />
    </>
  );

  const className =
    'group block overflow-hidden rounded border border-border bg-card transition-all hover:shadow-md';

  if (hasContent) {
    return (
      <Link to={`/academy/tecport-staff/course/${courseId}/learn`} className={className}>
        {body}
      </Link>
    );
  }

  return <article className={className}>{body}</article>;
}
