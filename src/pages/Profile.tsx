import { Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import PageHero from '@/components/PageHero';
import UserAvatar from '@/components/UserAvatar';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Profile() {
  const { t } = useLanguage();
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  const display = (value: string) => (value.trim() ? value : '—');

  const fields = [
    { label: t('profile.fullName'), value: user.fullName },
    { label: t('profile.site'), value: user.site },
    { label: t('profile.phone'), value: user.phone },
    { label: t('profile.specialty'), value: user.specialty },
    { label: t('profile.position'), value: user.position },
    { label: t('profile.username'), value: user.username },
  ];

  const subtitleParts = [user.position, user.site].filter(part => part.trim());

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PageHero title={t('profile.title')} subtitle={t('profile.subtitle')} />
      <main className="mx-auto max-w-3xl px-4 py-8">
        <div className="rounded border border-border bg-card p-6 sm:p-8">
          <div className="flex flex-col items-center gap-4 border-b border-border pb-6 sm:flex-row sm:items-start">
            <UserAvatar fullName={user.fullName} size="lg" />
            <div className="text-center sm:text-left">
              <h1 className="text-xl font-bold text-foreground">{user.fullName}</h1>
              {subtitleParts.length > 0 && (
                <p className="mt-1 text-sm text-muted-foreground">{subtitleParts.join(' · ')}</p>
              )}
            </div>
          </div>

          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            {fields.map(field => (
              <div key={field.label} className="rounded border border-border bg-secondary/40 px-4 py-3">
                <dt className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  {field.label}
                </dt>
                <dd className="mt-1 text-sm font-medium text-foreground">{display(field.value)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </main>
    </div>
  );
}
