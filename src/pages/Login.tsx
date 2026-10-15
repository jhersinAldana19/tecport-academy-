import { FormEvent, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import logo from '@/assets/logo.png';

export default function Login() {
  const { t } = useLanguage();
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const from =
    (location.state as { from?: string } | null)?.from || '/academy/tecport-staff';

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const ok = login(username, password);
    if (!ok) {
      setError(true);
      return;
    }
    setError(false);
    navigate(from, { replace: true });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded border border-border bg-card p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex flex-col items-center text-center">
          <img src={logo} alt="TECPORT" className="h-10" />
          <h1 className="mt-4 text-xl font-bold text-foreground">{t('auth.loginTitle')}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{t('auth.loginSubtitle')}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="mb-1 block text-xs font-medium text-foreground">
              {t('auth.username')}
            </label>
            <input
              id="username"
              autoComplete="username"
              value={username}
              onChange={e => {
                setUsername(e.target.value);
                setError(false);
              }}
              className="h-10 w-full rounded border border-border bg-background px-3 text-sm outline-none focus:ring-1 focus:ring-accent"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-xs font-medium text-foreground">
              {t('auth.password')}
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={e => {
                setPassword(e.target.value);
                setError(false);
              }}
              className="h-10 w-full rounded border border-border bg-background px-3 text-sm outline-none focus:ring-1 focus:ring-accent"
            />
          </div>

          {error && (
            <p className="text-xs text-destructive" role="alert">
              {t('auth.invalidCredentials')}
            </p>
          )}

          <button
            type="submit"
            className="h-10 w-full rounded bg-[#003558] text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            {t('auth.signIn')}
          </button>
        </form>
      </div>
    </div>
  );
}
