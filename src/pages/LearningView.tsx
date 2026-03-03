import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Play, FileText, HelpCircle, Download, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCourses } from '@/contexts/CourseContext';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';

const lessonIcon = { video: Play, pdf: FileText, quiz: HelpCircle };

export default function LearningView() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useLanguage();
  const { courses, completedLessons, toggleLessonComplete, getCourseProgress } = useCourses();
  const navigate = useNavigate();

  const course = courses.find(c => c.slug === slug);
  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="p-8 text-center text-muted-foreground">Course not found.</div>
      </div>
    );
  }

  const allLessons = course.sections.flatMap(s => s.lessons.map(l => ({ ...l, sectionTitle: s.title })));
  const currentLessonId = searchParams.get('lesson') || allLessons[0]?.id;
  const currentIndex = allLessons.findIndex(l => l.id === currentLessonId);
  const currentLesson = allLessons[currentIndex];
  const completed = completedLessons[course.id] || [];
  const isCompleted = currentLesson ? completed.includes(currentLesson.id) : false;
  const progress = getCourseProgress(course.id);

  const goToLesson = (lessonId: string) => {
    setSearchParams({ lesson: lessonId });
  };

  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-border bg-card px-4 py-2.5">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(`/academy/course/${slug}`)} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <p className="text-xs text-muted-foreground">{course.title}</p>
            <p className="text-sm font-semibold text-foreground">{currentLesson?.title}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground">{progress}% {t('course.completed')}</span>
          <div className="h-1.5 w-24 rounded bg-secondary">
            <div className="h-full rounded bg-accent transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Main content */}
        <div className="flex-1 p-4 lg:p-6">
          {/* Video placeholder */}
          <div className="mb-4 flex aspect-video items-center justify-center rounded border border-border bg-primary/5">
            <div className="text-center">
              <Play className="mx-auto h-12 w-12 text-primary/30" />
              <p className="mt-2 text-sm text-muted-foreground">
                {currentLesson?.type === 'video' ? 'Video Player' : currentLesson?.type === 'pdf' ? 'PDF Viewer' : 'Quiz Module'}
              </p>
            </div>
          </div>

          {/* Lesson controls */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {prevLesson && (
                <Button variant="outline" size="sm" onClick={() => goToLesson(prevLesson.id)}>
                  <ArrowLeft className="mr-1 h-3.5 w-3.5" /> {t('course.previousLesson')}
                </Button>
              )}
            </div>

            <Button
              variant={isCompleted ? 'secondary' : 'accent'}
              size="sm"
              onClick={() => currentLesson && toggleLessonComplete(course.id, currentLesson.id)}
            >
              {isCompleted ? <CheckCircle className="mr-1 h-3.5 w-3.5" /> : <Check className="mr-1 h-3.5 w-3.5" />}
              {t('course.markComplete')}
            </Button>

            <div className="flex gap-2">
              {nextLesson && (
                <Button variant="accent" size="sm" onClick={() => goToLesson(nextLesson.id)}>
                  {t('course.nextLesson')} <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Button>
              )}
            </div>
          </div>

          {/* Resources */}
          <div className="mt-6 rounded border border-border bg-card p-4">
            <h3 className="mb-2 text-sm font-semibold text-foreground">{t('course.resources')}</h3>
            <div className="space-y-2">
              <button className="flex items-center gap-2 text-sm text-accent hover:underline">
                <Download className="h-3.5 w-3.5" /> Lesson Material.pdf
              </button>
              <button className="flex items-center gap-2 text-sm text-accent hover:underline">
                <Download className="h-3.5 w-3.5" /> Safety Checklist.pdf
              </button>
            </div>
          </div>
        </div>

        {/* Right sidebar - lesson list */}
        <div className="w-full border-t border-border bg-card lg:w-80 lg:border-l lg:border-t-0">
          <div className="p-4">
            <h3 className="mb-3 text-sm font-semibold text-foreground">{t('course.courseContent')}</h3>
          </div>
          <div className="max-h-[calc(100vh-180px)] overflow-y-auto">
            {course.sections.map(section => (
              <div key={section.id}>
                <div className="bg-secondary px-4 py-2">
                  <p className="text-xs font-semibold text-secondary-foreground">{section.title}</p>
                </div>
                {section.lessons.map(lesson => {
                  const Icon = lessonIcon[lesson.type];
                  const isActive = lesson.id === currentLessonId;
                  const isDone = completed.includes(lesson.id);
                  return (
                    <button
                      key={lesson.id}
                      onClick={() => goToLesson(lesson.id)}
                      className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-secondary ${isActive ? 'bg-secondary border-l-2 border-accent' : ''}`}
                    >
                      {isDone ? (
                        <CheckCircle className="h-3.5 w-3.5 shrink-0 text-accent" />
                      ) : (
                        <Icon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                      )}
                      <span className={`flex-1 text-xs ${isActive ? 'font-medium text-foreground' : 'text-foreground'}`}>
                        {lesson.title}
                      </span>
                      <span className="text-[10px] text-muted-foreground">{lesson.duration}</span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
