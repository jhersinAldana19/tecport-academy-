import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import CourseStatusRibbon from '@/components/CourseStatusRibbon';
import { useLanguage } from '@/contexts/LanguageContext';
import { TEMP_ACCESS } from '@/config/tempAccess';
import type { Course } from '@/data/courses';

const levelColors: Record<string, string> = {
  Basic: 'bg-secondary text-secondary-foreground',
  Intermediate: 'bg-primary text-primary-foreground',
  Advanced: 'bg-accent text-accent-foreground',
};

export default function CourseCard({ course }: { course: Course }) {
  const { t } = useLanguage();
  const canEnter = TEMP_ACCESS.publicCoursesEnterable;

  const body = (
    <>
      <div className="relative aspect-[5/4] overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className={`h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
            canEnter ? '' : 'brightness-75'
          }`}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-foreground/20" />
        {!canEnter && (
          <CourseStatusRibbon label={t('course.underConstruction')} variant="unavailable" />
        )}
        <span className={`absolute left-3 top-3 z-20 rounded px-2 py-0.5 text-xs font-semibold ${levelColors[course.level]}`}>
          {t(`filter.${course.level.toLowerCase()}`)}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-sm font-semibold leading-tight text-foreground">{course.title}</h3>
        <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{course.subtitle}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {course.duration}
          </span>
          <span
            className={`text-xs font-semibold ${
              canEnter
                ? 'text-accent transition-colors group-hover:underline group-hover:decoration-accent group-hover:underline-offset-4'
                : 'text-muted-foreground'
            }`}
          >
            {canEnter ? `${t('course.viewCourse')} →` : t('course.comingSoon')}
          </span>
        </div>
      </div>
      <div className="h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full" />
    </>
  );

  const className =
    'group block overflow-hidden rounded border border-border bg-card transition-all hover:shadow-md';

  if (!canEnter) {
    return (
      <article className={`${className} cursor-not-allowed`} aria-disabled>
        {body}
      </article>
    );
  }

  return (
    <Link to={`/academy/course/${course.slug}`} className={className}>
      {body}
    </Link>
  );
}
