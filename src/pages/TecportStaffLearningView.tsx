import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, CheckCircle, ExternalLink, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  flattenTecportStaffSessions,
  getTecportStaffCourseById,
} from '@/data/tecportStaffCourses';

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
      <div className="flex items-center justify-between border-b border-border bg-card px-4 py-2.5">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/academy/tecport-staff')}
            className="text-muted-foreground hover:text-foreground"
            aria-label={t('common.back')}
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <p className="text-xs text-muted-foreground">{courseTitle}</p>
            <p className="text-sm font-semibold text-foreground">{sessionTitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground">
            {progress}% {t('course.completed')}
          </span>
          <div className="h-1.5 w-24 rounded bg-secondary">
            <div className="h-full rounded bg-accent transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col lg:flex-row">
        <div className="flex-1 p-4 lg:p-6">
          <div className="mb-4 flex aspect-video flex-col items-center justify-center rounded border border-border bg-primary/5 p-6 text-center">
            <Play className="h-12 w-12 text-primary/30" />
            <p className="mt-3 text-sm font-medium text-foreground">{sessionTitle}</p>
            <p className="mt-1 max-w-md text-xs text-muted-foreground">
              {t('tecportStaff.openVideoHint')}
            </p>
            {currentSession.videoUrl && (
              <Button asChild variant="accent" size="sm" className="mt-4">
                <a href={currentSession.videoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                  {t('tecportStaff.openVideo')}
                </a>
              </Button>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {prevSession && (
                <Button variant="outline" size="sm" onClick={() => goToSession(prevSession.id)}>
                  <ArrowLeft className="mr-1 h-3.5 w-3.5" /> {t('course.previousLesson')}
                </Button>
              )}
            </div>

            <Button
              variant={isCompleted ? 'secondary' : 'accent'}
              size="sm"
              onClick={toggleComplete}
            >
              {isCompleted ? (
                <CheckCircle className="mr-1 h-3.5 w-3.5" />
              ) : (
                <Check className="mr-1 h-3.5 w-3.5" />
              )}
              {t('course.markComplete')}
            </Button>

            <div className="flex gap-2">
              {nextSession && (
                <Button variant="accent" size="sm" onClick={() => goToSession(nextSession.id)}>
                  {t('course.nextLesson')} <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="w-full border-t border-border bg-card lg:w-80 lg:border-l lg:border-t-0">
          <div className="p-4">
            <h3 className="mb-3 text-sm font-semibold text-foreground">{t('course.courseContent')}</h3>
          </div>
          <div className="max-h-[calc(100vh-180px)] overflow-y-auto">
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
                      className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-secondary ${
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
                      <span className="text-[10px] text-muted-foreground">
                        {t(`tecportStaff.courses.${course.id}.sessions.${session.id}.duration`)}
                      </span>
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
