import { Link, useLocation } from 'react-router-dom';
import { Globe, Menu, X, User } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth, type UserRole } from '@/contexts/AuthContext';
import type { Language } from '@/data/translations';
import logo from '@/assets/logo.png';

const languageLabels: Record<Language, string> = { en: 'EN', es: 'ES', pt: 'PT' };

export default function Header() {
  const { t, language, setLanguage } = useLanguage();
  const { role, setRole } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  const navItems = [
    { label: t('nav.courses'), path: '/academy', show: true },
    { label: t('nav.library'), path: '/library', show: true },
    { label: t('nav.myCourses'), path: '/academy/my-courses', show: role === 'student' || role === 'admin' },
    { label: t('nav.admin'), path: '/academy/admin', show: role === 'admin' },
  ];

  const roles: UserRole[] = ['guest', 'student', 'admin'];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link to="/academy" className="flex items-center gap-2">
          <img src={logo} alt="TECPORT" className="h-8" />
          <span className="text-lg font-semibold text-muted-foreground">ACADEMY</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.filter(n => n.show).map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium transition-colors hover:text-accent ${isActive(item.path) ? 'text-accent' : 'text-gray-500'}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {/* Role switcher */}
          <div className="flex items-center gap-1 rounded border border-border px-2 py-1">
            <User className="h-3.5 w-3.5 text-muted-foreground" />
            <select
              value={role}
              onChange={e => setRole(e.target.value as UserRole)}
              className="bg-transparent text-xs font-medium text-foreground outline-none"
            >
              {roles.map(r => (
                <option key={r} value={r}>{t(`role.${r}`)}</option>
              ))}
            </select>
          </div>

          {/* Language switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 rounded border border-border px-2 py-1 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
            >
              <Globe className="h-3.5 w-3.5" />
              {languageLabels[language]}
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 rounded border border-border bg-card shadow-sm">
                {(['en', 'es', 'pt'] as Language[]).map(lang => (
                  <button
                    key={lang}
                    onClick={() => { setLanguage(lang); setLangOpen(false); }}
                    className={`block w-full px-4 py-1.5 text-left text-xs font-medium transition-colors hover:bg-secondary ${language === lang ? 'text-accent' : 'text-foreground'}`}
                  >
                    {languageLabels[lang]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu button */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden">
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="border-t border-border bg-card px-4 py-3 md:hidden">
          {navItems.filter(n => n.show).map(item => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`block py-2 text-sm font-medium ${isActive(item.path) ? 'text-accent' : 'text-gray-500'}`}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-2 flex items-center gap-2 border-t border-border pt-2">
            <select
              value={role}
              onChange={e => setRole(e.target.value as UserRole)}
              className="rounded border border-border bg-transparent px-2 py-1 text-xs"
            >
              {roles.map(r => <option key={r} value={r}>{t(`role.${r}`)}</option>)}
            </select>
            <div className="flex gap-1">
              {(['en', 'es', 'pt'] as Language[]).map(lang => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-2 py-1 text-xs font-medium ${language === lang ? 'text-accent' : 'text-muted-foreground'}`}
                >
                  {languageLabels[lang]}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
