import { Link } from 'react-router-dom';
import { Award, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCourses } from '@/contexts/CourseContext';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';

export default function MyCourses() {
  const { t } = useLanguage();
  const { courses, enrolledCourseIds, getCourseProgress } = useCourses();

  const enrolledCourses = courses.filter(c => enrolledCourseIds.includes(c.id));
  const inProgress = enrolledCourses.filter(c => getCourseProgress(c.id) < 100);
  const completed = enrolledCourses.filter(c => getCourseProgress(c.id) === 100);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold text-foreground">{t('myCourses.title')}</h1>

        {enrolledCourses.length === 0 ? (
          <div className="rounded border border-border bg-card p-8 text-center">
            <p className="text-sm text-muted-foreground">{t('myCourses.noCourses')}</p>
            <Link to="/academy">
              <Button variant="accent" className="mt-4">{t('nav.courses')}</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {/* In Progress */}
            {inProgress.length > 0 && (
              <section>
                <h2 className="mb-4 text-base font-semibold text-foreground">{t('myCourses.inProgress')}</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {inProgress.map(course => {
                    const progress = getCourseProgress(course.id);
                    return (
                      <div key={course.id} className="rounded border border-border bg-card p-4">
                        <div className="mb-3 flex items-start gap-3">
                          <img src={course.image} alt={course.title} className="h-16 w-24 rounded object-cover" />
                          <div className="flex-1">
                            <h3 className="text-sm font-semibold text-foreground">{course.title}</h3>
                            <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="h-3 w-3" /> {course.duration}</span>
                          </div>
                        </div>
                        <div className="mb-2 flex justify-between text-xs text-muted-foreground">
                          <span>{t('course.progress')}</span>
                          <span>{progress}%</span>
                        </div>
                        <div className="mb-3 h-1.5 w-full rounded bg-secondary">
                          <div className="h-full rounded bg-accent transition-all" style={{ width: `${progress}%` }} />
                        </div>
                        <Link to={`/academy/course/${course.slug}/learn`}>
                          <Button variant="accent" size="sm" className="w-full">{t('course.startCourse')}</Button>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Completed */}
            {completed.length > 0 && (
              <section>
                <h2 className="mb-4 text-base font-semibold text-foreground">{t('myCourses.completed')}</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {completed.map(course => (
                    <div key={course.id} className="rounded border border-border bg-card p-4">
                      <div className="flex items-start gap-3">
                        <img src={course.image} alt={course.title} className="h-16 w-24 rounded object-cover" />
                        <div>
                          <h3 className="text-sm font-semibold text-foreground">{course.title}</h3>
                          <div className="mt-1 flex items-center gap-1 text-xs text-accent">
                            <Award className="h-3 w-3" /> {t('course.certification')}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
