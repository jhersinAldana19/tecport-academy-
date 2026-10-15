import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Globe, LogOut, Menu, User, X } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth, type UserRole } from '@/contexts/AuthContext';
import { TEMP_ACCESS } from '@/config/tempAccess';
import UserAvatar from '@/components/UserAvatar';
import type { Language } from '@/data/translations';
import logo from '@/assets/logo.png';

const languageLabels: Record<Language, string> = { en: 'EN', es: 'ES', pt: 'PT' };

export default function Header() {
  const { t, language, setLanguage } = useLanguage();
  const { role, setRole, user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(`${path}/`);

  const navItems = [
    { label: t('nav.courses'), path: '/academy', show: !isAuthenticated && role !== 'tecport_staff' },
    { label: t('nav.library'), path: '/library', show: !isAuthenticated && role !== 'tecport_staff' },
    { label: t('nav.myCourses'), path: '/academy/my-courses', show: !isAuthenticated && role === 'student' },
    {
      label: t('nav.admin'),
      path: '/academy/admin',
      show: TEMP_ACCESS.adminEnabled && role === 'admin',
    },
    {
      label: t('nav.tecportStaff'),
      path: '/academy/tecport-staff',
      show: isAuthenticated || role === 'tecport_staff',
    },
    {
      label: t('nav.profile'),
      path: '/academy/profile',
      show: isAuthenticated,
    },
  ];

  const roles = TEMP_ACCESS.selectableRoles;
  const showRoleSwitcher = !isAuthenticated;

  const routeByRole: Record<UserRole, string> = {
    guest: '/academy',
    student: '/academy',
    tecport_staff: '/academy/tecport-staff',
    admin: TEMP_ACCESS.adminEnabled ? '/academy/admin' : '/academy',
  };

  const homePath = isAuthenticated || role === 'tecport_staff' ? '/academy/tecport-staff' : '/academy';

  const handleRoleChange = (nextRole: UserRole) => {
    setRole(nextRole);
    navigate(routeByRole[nextRole]);
    setMobileOpen(false);
  };

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link to={homePath} className="flex items-center gap-2">
          <img src={logo} alt="TECPORT" className="h-8" />
          <span className="text-lg font-semibold text-muted-foreground">ACADEMY</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems
            .filter(n => n.show)
            .map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  isActive(item.path) ? 'text-accent' : 'text-gray-500'
                }`}
              >
                {item.label}
              </Link>
            ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-2">
              <Link
                to="/academy/profile"
                className="flex max-w-[180px] items-center gap-2 rounded border border-border px-2 py-1 hover:bg-secondary"
              >
                <UserAvatar fullName={user.fullName} size="sm" />
                <span className="truncate text-xs font-medium text-foreground">{user.fullName}</span>
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-1 rounded border border-border px-2 py-1 text-xs font-medium text-foreground hover:bg-secondary"
              >
                <LogOut className="h-3.5 w-3.5" />
                {t('auth.logout')}
              </button>
            </div>
          ) : showRoleSwitcher ? (
            <div className="flex items-center gap-1 rounded border border-border px-2 py-1">
              <User className="h-3.5 w-3.5 text-muted-foreground" />
              <select
                value={role}
                onChange={e => handleRoleChange(e.target.value as UserRole)}
                className="bg-transparent text-xs font-medium text-foreground outline-none"
              >
                {roles.map(r => (
                  <option key={r} value={r}>
                    {t(`role.${r}`)}
                  </option>
                ))}
              </select>
            </div>
          ) : null}

          <div className="relative">
            <button
              type="button"
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
                    type="button"
                    onClick={() => {
                      setLanguage(lang);
                      setLangOpen(false);
                    }}
                    className={`block w-full px-4 py-1.5 text-left text-xs font-medium transition-colors hover:bg-secondary ${
                      language === lang ? 'text-accent' : 'text-foreground'
                    }`}
                  >
                    {languageLabels[lang]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <button type="button" onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden">
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-card px-4 py-3 md:hidden">
          {navItems
            .filter(n => n.show)
            .map(item => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`block py-2 text-sm font-medium ${
                  isActive(item.path) ? 'text-accent' : 'text-gray-500'
                }`}
              >
                {item.label}
              </Link>
            ))}

          <div className="mt-2 space-y-2 border-t border-border pt-2">
            {isAuthenticated && user ? (
              <>
                <div className="flex items-center gap-2 py-1">
                  <UserAvatar fullName={user.fullName} size="sm" />
                  <span className="text-xs font-medium text-foreground">{user.fullName}</span>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-xs font-medium text-foreground"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  {t('auth.logout')}
                </button>
              </>
            ) : (
              <select
                value={role}
                onChange={e => handleRoleChange(e.target.value as UserRole)}
                className="rounded border border-border bg-transparent px-2 py-1 text-xs"
              >
                {roles.map(r => (
                  <option key={r} value={r}>
                    {t(`role.${r}`)}
                  </option>
                ))}
              </select>
            )}

            <div className="flex gap-1">
              {(['en', 'es', 'pt'] as Language[]).map(lang => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setLanguage(lang)}
                  className={`px-2 py-1 text-xs font-medium ${
                    language === lang ? 'text-accent' : 'text-muted-foreground'
                  }`}
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
