import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCourses } from '@/contexts/CourseContext';
import { Button } from '@/components/ui/button';

export default function AdminCourses() {
  const { t } = useLanguage();
  const { courses, updateCourse, deleteCourse } = useCourses();

  const toggleVisibility = (course: typeof courses[0]) => {
    updateCourse({ ...course, visible: !course.visible });
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground">{t('admin.courses')}</h1>
        <Link to="/academy/admin/courses/new">
          <Button variant="accent" size="sm">
            <Plus className="mr-1 h-3.5 w-3.5" /> {t('admin.createCourse')}
          </Button>
        </Link>
      </div>

      <div className="rounded border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-muted-foreground">
              <th className="px-4 py-2 font-medium">Course</th>
              <th className="px-4 py-2 font-medium">Level</th>
              <th className="px-4 py-2 font-medium">Duration</th>
              <th className="px-4 py-2 font-medium">Students</th>
              <th className="px-4 py-2 font-medium">Status</th>
              <th className="px-4 py-2 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course.id} className="border-b border-border last:border-0">
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-3">
                    <img src={course.image} alt="" className="h-8 w-12 rounded object-cover" />
                    <div>
                      <p className="font-medium text-foreground">{course.title}</p>
                      <p className="text-xs text-muted-foreground">{course.instructor.name}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-2.5 text-foreground">{course.level}</td>
                <td className="px-4 py-2.5 text-foreground">{course.duration}</td>
                <td className="px-4 py-2.5 text-foreground">{course.studentsEnrolled}</td>
                <td className="px-4 py-2.5">
                  <button onClick={() => toggleVisibility(course)} className="flex items-center gap-1">
                    {course.visible ? (
                      <><Eye className="h-3.5 w-3.5 text-accent" /><span className="text-xs text-accent">{t('admin.visible')}</span></>
                    ) : (
                      <><EyeOff className="h-3.5 w-3.5 text-muted-foreground" /><span className="text-xs text-muted-foreground">{t('admin.hidden')}</span></>
                    )}
                  </button>
                </td>
                <td className="px-4 py-2.5 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Link to={`/academy/admin/courses/${course.id}/edit`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => deleteCourse(course.id)}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
