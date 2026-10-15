import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCourses } from '@/contexts/CourseContext';
import CourseCard from '@/components/CourseCard';
import Header from '@/components/Header';
import PageHero from '@/components/PageHero';
import type { Course } from '@/data/courses';

type LevelFilter = 'All' | 'Basic' | 'Intermediate' | 'Advanced';

export default function Index() {
  const { t } = useLanguage();
  const { getVisibleCourses } = useCourses();
  const allCourses = getVisibleCourses();
  const [levelFilter, setLevelFilter] = useState<LevelFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = useMemo(() => {
    return allCourses.filter(course => {
      // Filter by level
      const matchesLevel = levelFilter === 'All' || course.level === levelFilter;
      
      // Filter by search query
      const matchesSearch = searchQuery === '' || 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesLevel && matchesSearch;
    });
  }, [allCourses, levelFilter, searchQuery]);

  const levels: LevelFilter[] = ['All', 'Basic', 'Intermediate', 'Advanced'];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <PageHero title={t('home.heroTitle')} subtitle={t('home.heroSubtitle')} />

      <main className="mx-auto max-w-7xl px-4 py-8">
        {/* Filters and Search */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Level filters */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
            <div className="flex gap-1">
              {levels.map(level => (
                <button
                  key={level}
                  onClick={() => setLevelFilter(level)}
                  className={`rounded px-4 py-1.5 text-sm font-medium transition-colors ${
                    levelFilter === level
                      ? 'bg-accent text-white'
                      : 'border border-border bg-card text-foreground hover:bg-secondary'
                  }`}
                >
                  {t(`filter.${level.toLowerCase()}`)}
                </button>
              ))}
            </div>
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder={t('filter.searchCourses')}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="h-9 w-full rounded border border-border bg-card pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>
        </div>

        {/* Courses grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.length > 0 ? (
            filteredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-muted-foreground">
              {t('filter.noCourses')}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
