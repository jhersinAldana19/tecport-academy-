import { useLanguage } from '@/contexts/LanguageContext';
import { useCourses } from '@/contexts/CourseContext';
import CourseCard from '@/components/CourseCard';
import Header from '@/components/Header';

export default function Index() {
  const { t } = useLanguage();
  const { getVisibleCourses } = useCourses();
  const courses = getVisibleCourses();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">{t('home.title')}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{t('home.subtitle')}</p>
        </div>

        <h2 className="mb-4 text-lg font-semibold text-foreground">{t('home.allCourses')}</h2>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </main>
    </div>
  );
}
