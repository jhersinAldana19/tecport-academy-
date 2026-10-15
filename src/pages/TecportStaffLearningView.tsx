import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, CheckCircle, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  flattenTecportStaffSessions,
  getTecportStaffCourseById,
} from '@/data/tecportStaffCourses';
import { getYoutubeEmbedUrl } from '@/lib/youtube';

export default function TecportStaffLearningView() {
  const { courseId } = useParams<{ courseId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  const course = courseId ? getTecportStaffCourseById(courseId) : undefined;

  const allSessions = useMemo(
    () => (course ? flattenTecportStaffSessions(course) : []),
    [course],
  );

  if (!course || allSessions.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="p-8 text-center text-muted-foreground">
          {t('tecportStaff.courseNotFound')}
          <div className="mt-4">
            <Link to="/academy/tecport-staff" className="text-accent hover:underline">
              {t('common.back')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentSessionId = searchParams.get('session') || allSessions[0].id;
  const currentIndex = allSessions.findIndex(session => session.id === currentSessionId);
  const currentSession = allSessions[currentIndex] ?? allSessions[0];
  const isCompleted = completedIds.includes(currentSession.id);
  const progress = Math.round((completedIds.length / allSessions.length) * 100);

  const courseTitle = t(`tecportStaff.courses.${course.id}.title`);
  const sessionTitle = t(`tecportStaff.courses.${course.id}.sessions.${currentSession.id}.title`);
  const youtubeEmbedUrl = currentSession.videoUrl
    ? getYoutubeEmbedUrl(currentSession.videoUrl)
    : null;

  const goToSession = (sessionId: string) => {
    setSearchParams({ session: sessionId });
  };

  const toggleComplete = () => {
    setCompletedIds(prev =>
      prev.includes(currentSession.id)
        ? prev.filter(id => id !== currentSession.id)
        : [...prev, currentSession.id],
    );
  };

  const prevSession = currentIndex > 0 ? allSessions[currentIndex - 1] : null;
  const nextSession =
    currentIndex >= 0 && currentIndex < allSessions.length - 1
      ? allSessions[currentIndex + 1]
      : null;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Top bar */}
      <div className="border-b border-border bg-card px-3 py-2.5 sm:px-4">
        <div className="flex items-start gap-2 sm:items-center sm:justify-between">
          <div className="flex min-w-0 flex-1 items-start gap-2 sm:items-center sm:gap-3">
            <button
              type="button"
              onClick={() => navigate('/academy/tecport-staff')}
              className="mt-0.5 shrink-0 text-muted-foreground hover:text-foreground sm:mt-0"
              aria-label={t('common.back')}
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div className="min-w-0">
              <p className="truncate text-xs text-muted-foreground">{courseTitle}</p>
              <p className="truncate text-sm font-semibold text-foreground">{sessionTitle}</p>
            </div>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1 sm:flex-row sm:items-center sm:gap-3">
            <span className="whitespace-nowrap text-[10px] text-muted-foreground sm:text-xs">
              {progress}% {t('course.completed')}
            </span>
            <div className="h-1.5 w-16 rounded bg-secondary sm:w-24">
              <div
                className="h-full rounded bg-accent transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main: stack on mobile, side-by-side on desktop (no forced empty gap) */}
      <div className="flex flex-col lg:flex-1 lg:flex-row">
        <div className="p-3 sm:p-4 lg:flex-1 lg:p-6">
          <div className="mb-3 overflow-hidden rounded border border-border bg-primary/5 sm:mb-4">
            {youtubeEmbedUrl ? (
              <div className="aspect-video">
                <iframe
                  key={currentSession.id}
                  className="h-full w-full"
                  src={youtubeEmbedUrl}
                  title={sessionTitle}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="flex min-h-[220px] flex-col items-center justify-center px-4 py-8 text-center sm:aspect-video sm:min-h-0">
                <Play className="h-10 w-10 text-primary/30 sm:h-12 sm:w-12" />
                <p className="mt-3 text-sm font-medium text-foreground">{sessionTitle}</p>
                <p className="mt-1 max-w-md text-xs text-muted-foreground">
                  {t('tecportStaff.videoUnavailable')}
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-stretch gap-2 sm:items-center sm:justify-between">
            {prevSession && (
              <Button
                variant="outline"
                size="sm"
                className="min-w-0 flex-1 px-2 text-xs sm:flex-none sm:px-3 sm:text-sm"
                onClick={() => goToSession(prevSession.id)}
              >
                <ArrowLeft className="mr-1 h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{t('course.previousLesson')}</span>
              </Button>
            )}

            <Button
              variant={isCompleted ? 'secondary' : 'accent'}
              size="sm"
              className="min-w-0 flex-1 px-2 text-xs sm:flex-none sm:px-3 sm:text-sm"
              onClick={toggleComplete}
            >
              {isCompleted ? (
                <CheckCircle className="mr-1 h-3.5 w-3.5 shrink-0" />
              ) : (
                <Check className="mr-1 h-3.5 w-3.5 shrink-0" />
              )}
              <span className="truncate">{t('course.markComplete')}</span>
            </Button>

            {nextSession && (
              <Button
                variant="accent"
                size="sm"
                className="min-w-0 flex-1 px-2 text-xs sm:flex-none sm:px-3 sm:text-sm"
                onClick={() => goToSession(nextSession.id)}
              >
                <span className="truncate">{t('course.nextLesson')}</span>
                <ArrowRight className="ml-1 h-3.5 w-3.5 shrink-0" />
              </Button>
            )}
          </div>
        </div>

        <aside className="w-full border-t border-border bg-card lg:w-80 lg:shrink-0 lg:border-l lg:border-t-0">
          <div className="p-3 sm:p-4">
            <h3 className="text-sm font-semibold text-foreground">{t('course.courseContent')}</h3>
          </div>
          <div className="pb-4 lg:max-h-[calc(100vh-4.5rem)] lg:overflow-y-auto">
            {course.sections.map(section => (
              <div key={section.id}>
                <div className="bg-secondary px-4 py-2">
                  <p className="text-xs font-semibold text-secondary-foreground">
                    {t(`tecportStaff.courses.${course.id}.sections.${section.id}`)}
                  </p>
                </div>
                {section.sessions.map(session => {
                  const isActive = session.id === currentSession.id;
                  const isDone = completedIds.includes(session.id);
                  return (
                    <button
                      key={session.id}
                      type="button"
                      onClick={() => goToSession(session.id)}
                      className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-secondary sm:py-2.5 ${
                        isActive ? 'border-l-2 border-accent bg-secondary' : ''
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle className="h-3.5 w-3.5 shrink-0 text-accent" />
                      ) : (
                        <Play className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                      )}
                      <span
                        className={`flex-1 text-xs ${isActive ? 'font-medium text-foreground' : 'text-foreground'}`}
                      >
                        {t(`tecportStaff.courses.${course.id}.sessions.${session.id}.title`)}
                      </span>
                      <span className="shrink-0 text-[10px] text-muted-foreground">
                        {t(`tecportStaff.courses.${course.id}.sessions.${session.id}.duration`)}
                      </span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
