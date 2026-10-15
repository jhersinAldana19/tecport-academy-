import Header from '@/components/Header';
import PageHero from '@/components/PageHero';
import TecportStaffCourseCard from '@/components/TecportStaffCourseCard';
import {
  hasTecportStaffCourseContent,
  tecportStaffCourses,
} from '@/data/tecportStaffCourses';
import { useLanguage } from '@/contexts/LanguageContext';

export default function TecportStaff() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PageHero title={t('home.heroTitle')} subtitle={t('home.heroSubtitle')} />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground">{t('tecportStaff.title')}</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{t('tecportStaff.intro')}</p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tecportStaffCourses.map(course => (
            <TecportStaffCourseCard
              key={course.id}
              courseId={course.id}
              imageSrc={course.image}
              title={t(`tecportStaff.courses.${course.id}.title`)}
              subtitle={t(`tecportStaff.courses.${course.id}.subtitle`)}
              duration={t(`tecportStaff.courses.${course.id}.duration`)}
              levelLabel={t(`filter.${course.levelFilter}`)}
              levelFilter={course.levelFilter}
              hasContent={hasTecportStaffCourseContent(course)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
