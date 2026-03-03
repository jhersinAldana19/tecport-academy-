import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { defaultCourses, type Course } from '@/data/courses';

interface CourseContextType {
  courses: Course[];
  enrolledCourseIds: string[];
  completedLessons: Record<string, string[]>;
  addCourse: (course: Course) => void;
  updateCourse: (course: Course) => void;
  deleteCourse: (id: string) => void;
  enrollInCourse: (courseId: string) => void;
  toggleLessonComplete: (courseId: string, lessonId: string) => void;
  getCourseProgress: (courseId: string) => number;
  getVisibleCourses: () => Course[];
}

const CourseContext = createContext<CourseContextType | null>(null);

export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('tecport-courses');
    return saved ? JSON.parse(saved) : defaultCourses;
  });

  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('tecport-enrolled');
    return saved ? JSON.parse(saved) : ['1', '3', '6'];
  });

  const [completedLessons, setCompletedLessons] = useState<Record<string, string[]>>(() => {
    const saved = localStorage.getItem('tecport-completed');
    return saved ? JSON.parse(saved) : { '1': ['l1-1', 'l1-2'], '6': ['l6-1'] };
  });

  useEffect(() => {
    localStorage.setItem('tecport-courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('tecport-enrolled', JSON.stringify(enrolledCourseIds));
  }, [enrolledCourseIds]);

  useEffect(() => {
    localStorage.setItem('tecport-completed', JSON.stringify(completedLessons));
  }, [completedLessons]);

  const addCourse = useCallback((course: Course) => {
    setCourses(prev => [...prev, course]);
  }, []);

  const updateCourse = useCallback((course: Course) => {
    setCourses(prev => prev.map(c => c.id === course.id ? course : c));
  }, []);

  const deleteCourse = useCallback((id: string) => {
    setCourses(prev => prev.filter(c => c.id !== id));
  }, []);

  const enrollInCourse = useCallback((courseId: string) => {
    setEnrolledCourseIds(prev => prev.includes(courseId) ? prev : [...prev, courseId]);
  }, []);

  const toggleLessonComplete = useCallback((courseId: string, lessonId: string) => {
    setCompletedLessons(prev => {
      const current = prev[courseId] || [];
      const updated = current.includes(lessonId)
        ? current.filter(id => id !== lessonId)
        : [...current, lessonId];
      return { ...prev, [courseId]: updated };
    });
  }, []);

  const getCourseProgress = useCallback((courseId: string): number => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return 0;
    const totalLessons = course.sections.reduce((sum, s) => sum + s.lessons.length, 0);
    if (totalLessons === 0) return 0;
    const completed = (completedLessons[courseId] || []).length;
    return Math.round((completed / totalLessons) * 100);
  }, [courses, completedLessons]);

  const getVisibleCourses = useCallback(() => {
    return courses.filter(c => c.visible);
  }, [courses]);

  return (
    <CourseContext.Provider value={{
      courses,
      enrolledCourseIds,
      completedLessons,
      addCourse,
      updateCourse,
      deleteCourse,
      enrollInCourse,
      toggleLessonComplete,
      getCourseProgress,
      getVisibleCourses,
    }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => {
  const context = useContext(CourseContext);
  if (!context) throw new Error('useCourses must be used within CourseProvider');
  return context;
};
