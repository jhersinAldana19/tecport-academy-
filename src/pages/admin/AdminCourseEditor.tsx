import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Plus, Trash2, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCourses } from '@/contexts/CourseContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { Course, Section, Lesson } from '@/data/courses';
import instructorMale from '@/assets/instructors/instructor-male.jpg';

const emptyLesson = (): Lesson => ({
  id: `l-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
  title: '',
  duration: '15 min',
  type: 'video',
});

const emptySection = (): Section => ({
  id: `s-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
  title: '',
  lessons: [emptyLesson()],
});

const emptyCourse = (): Course => ({
  id: `${Date.now()}`,
  slug: '',
  title: '',
  subtitle: '',
  description: '',
  image: '',
  duration: '',
  level: 'Basic',
  language: 'English',
  rating: 0,
  studentsEnrolled: 0,
  instructor: { name: 'Roberto Hernández', title: 'Senior Port Operations Engineer', avatar: instructorMale, bio: '' },
  certification: true,
  visible: true,
  whatYouWillLearn: [''],
  requirements: [''],
  includes: ['Certificate of completion'],
  sections: [emptySection()],
});

export default function AdminCourseEditor() {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  const { courses, addCourse, updateCourse } = useCourses();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [course, setCourse] = useState<Course>(emptyCourse);

  useEffect(() => {
    if (isEdit) {
      const existing = courses.find(c => c.id === id);
      if (existing) setCourse({ ...existing });
    }
  }, [id, isEdit, courses]);

  const updateField = <K extends keyof Course>(key: K, value: Course[K]) => {
    setCourse(prev => ({ ...prev, [key]: value }));
  };

  const updateSlug = (title: string) => {
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    setCourse(prev => ({ ...prev, title, slug }));
  };

  const addSection = () => {
    setCourse(prev => ({ ...prev, sections: [...prev.sections, emptySection()] }));
  };

  const removeSection = (sectionId: string) => {
    setCourse(prev => ({ ...prev, sections: prev.sections.filter(s => s.id !== sectionId) }));
  };

  const updateSectionTitle = (sectionId: string, title: string) => {
    setCourse(prev => ({
      ...prev,
      sections: prev.sections.map(s => s.id === sectionId ? { ...s, title } : s),
    }));
  };

  const addLesson = (sectionId: string) => {
    setCourse(prev => ({
      ...prev,
      sections: prev.sections.map(s =>
        s.id === sectionId ? { ...s, lessons: [...s.lessons, emptyLesson()] } : s
      ),
    }));
  };

  const removeLesson = (sectionId: string, lessonId: string) => {
    setCourse(prev => ({
      ...prev,
      sections: prev.sections.map(s =>
        s.id === sectionId ? { ...s, lessons: s.lessons.filter(l => l.id !== lessonId) } : s
      ),
    }));
  };

  const updateLesson = (sectionId: string, lessonId: string, updates: Partial<Lesson>) => {
    setCourse(prev => ({
      ...prev,
      sections: prev.sections.map(s =>
        s.id === sectionId ? {
          ...s,
          lessons: s.lessons.map(l => l.id === lessonId ? { ...l, ...updates } : l),
        } : s
      ),
    }));
  };

  const updateListItem = (key: 'whatYouWillLearn' | 'requirements' | 'includes', index: number, value: string) => {
    setCourse(prev => {
      const arr = [...prev[key]];
      arr[index] = value;
      return { ...prev, [key]: arr };
    });
  };

  const addListItem = (key: 'whatYouWillLearn' | 'requirements' | 'includes') => {
    setCourse(prev => ({ ...prev, [key]: [...prev[key], ''] }));
  };

  const removeListItem = (key: 'whatYouWillLearn' | 'requirements' | 'includes', index: number) => {
    setCourse(prev => ({ ...prev, [key]: prev[key].filter((_, i) => i !== index) }));
  };

  const handleSave = () => {
    if (isEdit) {
      updateCourse(course);
    } else {
      addCourse(course);
    }
    navigate('/academy/admin/courses');
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/academy/admin/courses')} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <h1 className="text-xl font-bold text-foreground">
            {isEdit ? t('admin.editCourse') : t('admin.createCourse')}
          </h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate('/academy/admin/courses')}>{t('admin.cancel')}</Button>
          <Button variant="accent" size="sm" onClick={handleSave}>{t('admin.save')}</Button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Basic info */}
        <div className="rounded border border-border bg-card p-4 space-y-4">
          <h2 className="text-sm font-semibold text-foreground">Basic Information</h2>
          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">{t('admin.courseName')}</label>
              <Input value={course.title} onChange={e => updateSlug(e.target.value)} />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">{t('admin.courseSubtitle')}</label>
              <Input value={course.subtitle} onChange={e => updateField('subtitle', e.target.value)} />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">{t('admin.courseDescription')}</label>
              <Textarea rows={3} value={course.description} onChange={e => updateField('description', e.target.value)} />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">{t('course.duration')}</label>
                <Input value={course.duration} onChange={e => updateField('duration', e.target.value)} placeholder="e.g. 40 hours" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">{t('course.level')}</label>
                <select
                  value={course.level}
                  onChange={e => updateField('level', e.target.value as Course['level'])}
                  className="w-full rounded border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="Basic">Basic</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">{t('course.language')}</label>
                <select
                  value={course.language}
                  onChange={e => updateField('language', e.target.value)}
                  className="w-full rounded border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="Portuguese">Portuguese</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <label className="text-xs font-medium text-muted-foreground">Visible</label>
              <button
                onClick={() => updateField('visible', !course.visible)}
                className={`relative h-5 w-9 rounded-full transition-colors ${course.visible ? 'bg-accent' : 'bg-secondary'}`}
              >
                <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-card shadow transition-transform ${course.visible ? 'translate-x-4' : 'translate-x-0.5'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* What you'll learn */}
        <div className="rounded border border-border bg-card p-4 space-y-3">
          <h2 className="text-sm font-semibold text-foreground">{t('course.whatYouWillLearn')}</h2>
          {course.whatYouWillLearn.map((item, i) => (
            <div key={i} className="flex gap-2">
              <Input value={item} onChange={e => updateListItem('whatYouWillLearn', i, e.target.value)} className="flex-1" />
              <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => removeListItem('whatYouWillLearn', i)}>
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={() => addListItem('whatYouWillLearn')}>
            <Plus className="mr-1 h-3.5 w-3.5" /> Add item
          </Button>
        </div>

        {/* Requirements */}
        <div className="rounded border border-border bg-card p-4 space-y-3">
          <h2 className="text-sm font-semibold text-foreground">{t('course.requirements')}</h2>
          {course.requirements.map((item, i) => (
            <div key={i} className="flex gap-2">
              <Input value={item} onChange={e => updateListItem('requirements', i, e.target.value)} className="flex-1" />
              <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => removeListItem('requirements', i)}>
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={() => addListItem('requirements')}>
            <Plus className="mr-1 h-3.5 w-3.5" /> Add item
          </Button>
        </div>

        {/* Course Content (Sections & Lessons) */}
        <div className="rounded border border-border bg-card p-4 space-y-4">
          <h2 className="text-sm font-semibold text-foreground">{t('course.courseContent')}</h2>
          {course.sections.map((section, si) => (
            <div key={section.id} className="rounded border border-border p-3 space-y-3">
              <div className="flex items-center gap-2">
                <Input
                  value={section.title}
                  onChange={e => updateSectionTitle(section.id, e.target.value)}
                  placeholder={`Section ${si + 1} title`}
                  className="flex-1"
                />
                <Button variant="ghost" size="icon" className="h-9 w-9 text-destructive" onClick={() => removeSection(section.id)}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
              {section.lessons.map((lesson, li) => (
                <div key={lesson.id} className="ml-4 flex items-center gap-2">
                  <Input
                    value={lesson.title}
                    onChange={e => updateLesson(section.id, lesson.id, { title: e.target.value })}
                    placeholder={`Lesson ${li + 1}`}
                    className="flex-1"
                  />
                  <Input
                    value={lesson.duration}
                    onChange={e => updateLesson(section.id, lesson.id, { duration: e.target.value })}
                    className="w-20"
                    placeholder="15 min"
                  />
                  <select
                    value={lesson.type}
                    onChange={e => updateLesson(section.id, lesson.id, { type: e.target.value as Lesson['type'] })}
                    className="rounded border border-input bg-background px-2 py-1.5 text-xs"
                  >
                    <option value="video">Video</option>
                    <option value="pdf">PDF</option>
                    <option value="quiz">Quiz</option>
                  </select>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeLesson(section.id, lesson.id)}>
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" className="ml-4" onClick={() => addLesson(section.id)}>
                <Plus className="mr-1 h-3 w-3" /> {t('admin.addLesson')}
              </Button>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={addSection}>
            <Plus className="mr-1 h-3.5 w-3.5" /> {t('admin.addSection')}
          </Button>
        </div>
      </div>
    </div>
  );
}
