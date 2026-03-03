import { useParams, Link, useNavigate } from 'react-router-dom';
import { Clock, Globe, Award, Star, Users, ChevronDown, ChevronRight, Play, FileText, HelpCircle, Check, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCourses } from '@/contexts/CourseContext';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import CourseCard from '@/components/CourseCard';
import { Button } from '@/components/ui/button';

const lessonIcon = { video: Play, pdf: FileText, quiz: HelpCircle };

export default function CourseDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useLanguage();
  const { courses, enrollInCourse, enrolledCourseIds, getCourseProgress } = useCourses();
  const { role } = useAuth();
  const navigate = useNavigate();

  const course = courses.find(c => c.slug === slug);
  const [openSections, setOpenSections] = useState<string[]>([]);

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="mx-auto max-w-7xl px-4 py-16 text-center">
          <p className="text-muted-foreground">Course not found.</p>
          <Link to="/academy" className="mt-4 inline-block text-sm text-accent hover:underline">{t('common.back')}</Link>
        </div>
      </div>
    );
  }

  const isEnrolled = enrolledCourseIds.includes(course.id);
  const progress = getCourseProgress(course.id);
  const totalLessons = course.sections.reduce((s, sec) => s + sec.lessons.length, 0);
  const relatedCourses = courses.filter(c => c.id !== course.id && c.visible).slice(0, 3);

  const toggleSection = (id: string) => {
    setOpenSections(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const handleStart = () => {
    if (role === 'guest') return;
    enrollInCourse(course.id);
    const firstLesson = course.sections[0]?.lessons[0];
    if (firstLesson) {
      navigate(`/academy/course/${course.slug}/learn?lesson=${firstLesson.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Banner */}
      <div className="relative h-48 overflow-hidden bg-primary md:h-64">
        <img src={course.image} alt={course.title} className="h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-7xl px-4 pb-6">
            <Link to="/academy" className="mb-2 inline-flex items-center gap-1 text-xs text-primary-foreground/80 hover:text-primary-foreground">
              <ArrowLeft className="h-3 w-3" /> {t('common.back')}
            </Link>
            <h1 className="text-xl font-bold text-primary-foreground md:text-3xl">{course.title}</h1>
            <p className="mt-1 text-sm text-primary-foreground/80">{course.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <section>
              <p className="text-sm leading-relaxed text-foreground">{course.description}</p>
            </section>

            {/* Instructor */}
            <section className="flex items-start gap-4 rounded border border-border bg-card p-4">
              <img src={course.instructor.avatar} alt={course.instructor.name} className="h-14 w-14 rounded object-cover" />
              <div>
                <p className="text-xs text-muted-foreground">{t('course.instructor')}</p>
                <p className="font-semibold text-foreground">{course.instructor.name}</p>
                <p className="text-xs text-muted-foreground">{course.instructor.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{course.instructor.bio}</p>
              </div>
            </section>

            {/* What you'll learn */}
            <section>
              <h2 className="mb-3 text-base font-semibold text-foreground">{t('course.whatYouWillLearn')}</h2>
              <div className="grid gap-2 sm:grid-cols-2">
                {course.whatYouWillLearn.map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Course content accordion */}
            <section>
              <h2 className="mb-3 text-base font-semibold text-foreground">
                {t('course.courseContent')} — {course.sections.length} {t('course.sections')}, {totalLessons} {t('course.lessons')}
              </h2>
              <div className="rounded border border-border divide-y divide-border">
                {course.sections.map(section => {
                  const isOpen = openSections.includes(section.id);
                  return (
                    <div key={section.id}>
                      <button
                        onClick={() => toggleSection(section.id)}
                        className="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-secondary"
                      >
                        <div className="flex items-center gap-2">
                          {isOpen ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                          <span className="text-sm font-medium text-foreground">{section.title}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{section.lessons.length} {t('course.lessons')}</span>
                      </button>
                      {isOpen && (
                        <div className="bg-card">
                          {section.lessons.map(lesson => {
                            const Icon = lessonIcon[lesson.type];
                            return (
                              <div key={lesson.id} className="flex items-center gap-3 border-t border-border px-4 py-2.5 pl-10">
                                <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                                <span className="flex-1 text-sm text-foreground">{lesson.title}</span>
                                <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Requirements */}
            <section>
              <h2 className="mb-3 text-base font-semibold text-foreground">{t('course.requirements')}</h2>
              <ul className="space-y-1">
                {course.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" />
                    {req}
                  </li>
                ))}
              </ul>
            </section>

            {/* Includes */}
            <section>
              <h2 className="mb-3 text-base font-semibold text-foreground">{t('course.includes')}</h2>
              <ul className="space-y-1">
                {course.includes.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Related courses */}
            {relatedCourses.length > 0 && (
              <section>
                <h2 className="mb-4 text-base font-semibold text-foreground">{t('course.relatedCourses')}</h2>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {relatedCourses.map(c => <CourseCard key={c.id} course={c} />)}
                </div>
              </section>
            )}
          </div>

          {/* Right sticky panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 rounded border border-border bg-card p-5 space-y-4">
              <img src={course.image} alt={course.title} className="w-full rounded object-cover aspect-video" />

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{t('course.duration')}</span>
                  <span className="flex items-center gap-1 font-medium text-foreground"><Clock className="h-3.5 w-3.5" /> {course.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{t('course.level')}</span>
                  <span className="font-medium text-foreground">{course.level}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{t('course.language')}</span>
                  <span className="flex items-center gap-1 font-medium text-foreground"><Globe className="h-3.5 w-3.5" /> {course.language}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{t('course.rating')}</span>
                  <span className="flex items-center gap-1 font-medium text-foreground"><Star className="h-3.5 w-3.5 fill-accent text-accent" /> {course.rating}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{t('course.students')}</span>
                  <span className="flex items-center gap-1 font-medium text-foreground"><Users className="h-3.5 w-3.5" /> {course.studentsEnrolled}</span>
                </div>
                {course.certification && (
                  <div className="flex items-center gap-2 rounded bg-secondary p-2">
                    <Award className="h-4 w-4 text-accent" />
                    <span className="text-xs font-medium text-foreground">{t('course.certification')}</span>
                  </div>
                )}
              </div>

              {isEnrolled && (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{t('course.progress')}</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded bg-secondary">
                    <div className="h-full rounded bg-accent transition-all" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              )}

              <Button
                variant="accent"
                className="w-full"
                onClick={handleStart}
                disabled={role === 'guest'}
              >
                {isEnrolled ? t('course.startCourse') : t('course.startCourse')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
