import esquemasElectricos from '@/assets/courses/tecport-staff/esquemas-electricos.webp';
import esquemasHidraulicos from '@/assets/courses/tecport-staff/esquemas-hidraulicos.webp';
import troubleShooting from '@/assets/courses/tecport-staff/trouble-shooting.webp';

/**
 * Translation keys:
 * - Course: `tecportStaff.courses.<id>.(title|subtitle|duration)`
 * - Section: `tecportStaff.courses.<id>.sections.<sectionId>`
 * - Session: `tecportStaff.courses.<id>.sessions.<sessionId>.(title|duration)`
 */
export type TecportStaffCourseId =
  | 'esquemas-electricos'
  | 'hidraulica-avanzada'
  | 'trouble-shooting';

export type TecportStaffCourseLevelFilter = 'basic' | 'intermediate' | 'advanced';

export interface TecportStaffSession {
  id: string;
  /** Prefer YouTube watch URLs for in-app playback. */
  videoUrl?: string;
}

export interface TecportStaffSection {
  id: string;
  sessions: TecportStaffSession[];
}

export interface TecportStaffCourse {
  id: TecportStaffCourseId;
  image: string;
  levelFilter: TecportStaffCourseLevelFilter;
  sections: TecportStaffSection[];
}

const HIDRAULICA_CLASE_1 = 'https://www.youtube.com/watch?v=qbaPz1r1KMo';
const HIDRAULICA_CLASE_2 = 'https://www.youtube.com/watch?v=gOQwz7CZQf8';

export const tecportStaffCourses: readonly TecportStaffCourse[] = [
  {
    id: 'esquemas-electricos',
    image: esquemasElectricos,
    levelFilter: 'advanced',
    sections: [],
  },
  {
    id: 'hidraulica-avanzada',
    image: esquemasHidraulicos,
    levelFilter: 'advanced',
    sections: [
      {
        id: 'sesiones',
        sessions: [
          { id: 'clase-1', videoUrl: HIDRAULICA_CLASE_1 },
          { id: 'clase-2', videoUrl: HIDRAULICA_CLASE_2 },
        ],
      },
    ],
  },
  {
    id: 'trouble-shooting',
    image: troubleShooting,
    levelFilter: 'intermediate',
    sections: [],
  },
];

export function getTecportStaffCourseById(id: string): TecportStaffCourse | undefined {
  return tecportStaffCourses.find(course => course.id === id);
}

export function hasTecportStaffCourseContent(course: TecportStaffCourse): boolean {
  return course.sections.some(section => section.sessions.length > 0);
}

export function flattenTecportStaffSessions(course: TecportStaffCourse) {
  return course.sections.flatMap(section =>
    section.sessions.map(session => ({
      ...session,
      sectionId: section.id,
    })),
  );
}
