import { Link, useLocation, Outlet } from 'react-router-dom';
import { BarChart3, BookOpen, Users, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';

const adminNav = [
  { key: 'admin.dashboard', path: '/academy/admin', icon: BarChart3, end: true },
  { key: 'admin.courses', path: '/academy/admin/courses', icon: BookOpen },
  { key: 'admin.users', path: '/academy/admin/users', icon: Users },
];

export default function AdminLayout() {
  const { t } = useLanguage();
  const location = useLocation();

  const isActive = (path: string, end?: boolean) => {
    if (end) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <aside className="hidden w-56 shrink-0 border-r border-border bg-card md:block">
          <div className="p-4">
            <Link to="/academy" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-3 w-3" /> {t('common.back')}
            </Link>
            <h2 className="mt-3 text-sm font-bold text-foreground">{t('nav.admin')}</h2>
          </div>
          <nav className="px-2">
            {adminNav.map(item => {
              const active = isActive(item.path, item.end);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`mb-0.5 flex items-center gap-2 rounded px-3 py-2 text-sm font-medium transition-colors ${active ? 'bg-[#1a4d6f] text-white' : 'text-gray-500 hover:bg-secondary'}`}
                >
                  <item.icon className="h-4 w-4" />
                  {t(item.key)}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
