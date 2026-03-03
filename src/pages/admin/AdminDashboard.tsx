import { Users, BookOpen, TrendingUp, Award } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCourses } from '@/contexts/CourseContext';

export default function AdminDashboard() {
  const { t } = useLanguage();
  const { courses } = useCourses();

  const totalStudents = courses.reduce((sum, c) => sum + c.studentsEnrolled, 0);
  const mostPopular = [...courses].sort((a, b) => b.studentsEnrolled - a.studentsEnrolled)[0];

  const stats = [
    { label: t('admin.totalStudents'), value: totalStudents.toLocaleString(), icon: Users },
    { label: t('admin.totalCourses'), value: courses.length, icon: BookOpen },
    { label: t('admin.completionRate'), value: '72%', icon: TrendingUp },
    { label: t('admin.mostPopular'), value: mostPopular?.title || '—', icon: Award },
  ];

  return (
    <div>
      <h1 className="mb-6 text-xl font-bold text-foreground">{t('admin.dashboard')}</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(stat => (
          <div key={stat.label} className="rounded border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-secondary">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="text-lg font-bold text-foreground">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Simple table showing recent activity */}
      <div className="mt-8 rounded border border-border bg-card">
        <div className="border-b border-border px-4 py-3">
          <h2 className="text-sm font-semibold text-foreground">Course Overview</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-muted-foreground">
              <th className="px-4 py-2 font-medium">Course</th>
              <th className="px-4 py-2 font-medium">Students</th>
              <th className="px-4 py-2 font-medium">Rating</th>
              <th className="px-4 py-2 font-medium">Level</th>
              <th className="px-4 py-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course.id} className="border-b border-border last:border-0">
                <td className="px-4 py-2.5 font-medium text-foreground">{course.title}</td>
                <td className="px-4 py-2.5 text-foreground">{course.studentsEnrolled}</td>
                <td className="px-4 py-2.5 text-foreground">{course.rating}</td>
                <td className="px-4 py-2.5 text-foreground">{course.level}</td>
                <td className="px-4 py-2.5">
                  <span className={`rounded px-2 py-0.5 text-xs font-medium ${course.visible ? 'bg-accent/10 text-accent' : 'bg-secondary text-muted-foreground'}`}>
                    {course.visible ? t('admin.visible') : t('admin.hidden')}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
