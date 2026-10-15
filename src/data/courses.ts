import reachStackerImg from '@/assets/courses/reach-stacker.jpg';
import craneImg from '@/assets/courses/crane-operations.jpg';
import forkliftImg from '@/assets/courses/forklift.jpg';
import portTerminalImg from '@/assets/courses/port-terminal.jpg';
import heavyEquipmentImg from '@/assets/courses/heavy-equipment.jpg';
import safetyImg from '@/assets/courses/safety-ppe.jpg';
import instructorMale from '@/assets/instructors/instructor-male.jpg';
import instructorFemale from '@/assets/instructors/instructor-female.jpg';

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'pdf' | 'quiz';
  videoUrl?: string; // Optional YouTube video URL
}

export interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Instructor {
  name: string;
  title: string;
  avatar: string;
  bio: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  duration: string;
  level: 'Basic' | 'Intermediate' | 'Advanced';
  language: string;
  rating: number;
  studentsEnrolled: number;
  instructor: Instructor;
  certification: boolean;
  visible: boolean;
  whatYouWillLearn: string[];
  requirements: string[];
  includes: string[];
  sections: Section[];
}

const instructors: Instructor[] = [
  {
    name: 'Roberto Hernández',
    title: 'Senior Port Operations Engineer',
    avatar: instructorMale,
    bio: '15+ years in port terminal operations and heavy equipment management. Certified OSHA trainer.',
  },
  {
    name: 'Geraldo Rengifo',
    title: 'Industrial Safety Specialist',
    avatar: instructorMale,
    bio: '12 years of experience in industrial safety, risk assessment, and compliance training.',
  },
];

export const defaultCourses: Course[] = [
  {
    id: '1',
    slug: 'reach-stacker-operations',
    title: 'Reach Stacker Operations',
    subtitle: 'Complete operator certification for container handling',
    description: 'Comprehensive training program covering all aspects of reach stacker operations in port terminal environments. Learn safe handling procedures, load management, and maintenance protocols required for professional certification.',
    image: reachStackerImg,
    duration: '4 hours',
    level: 'Intermediate',
    language: 'English',
    rating: 4.8,
    studentsEnrolled: 234,
    instructor: instructors[0],
    certification: true,
    visible: true,
    whatYouWillLearn: [
      'Operate reach stackers safely in port environments',
      'Perform pre-operation inspections',
      'Handle containers of various sizes and weights',
      'Navigate terminal traffic and pedestrian zones',
      'Execute emergency procedures',
      'Maintain equipment logs and documentation',
    ],
    requirements: [
      'Valid driver license',
      'Basic understanding of port operations',
      'Physical fitness certificate',
    ],
    includes: [
      'Certificate of completion',
      '4 hours of video content',
      'Downloadable safety checklists',
      'Practice assessments',
      'Operator handbook PDF',
    ],
    sections: [
      {
        id: 's1-1',
        title: 'Introduction to Reach Stackers',
        lessons: [
          { id: 'l1-1', title: 'Equipment Overview', duration: '15 min', type: 'video' },
          { id: 'l1-2', title: 'Safety Regulations', duration: '20 min', type: 'video' },
          { id: 'l1-3', title: 'Safety Manual', duration: '10 min', type: 'pdf' },
        ],
      },
      {
        id: 's1-2',
        title: 'Pre-Operation Procedures',
        lessons: [
          { id: 'l1-4', title: 'Daily Inspection Checklist', duration: '25 min', type: 'video' },
          { id: 'l1-5', title: 'Starting Procedures', duration: '15 min', type: 'video' },
          { id: 'l1-6', title: 'Knowledge Check', duration: '10 min', type: 'quiz' },
        ],
      },
      {
        id: 's1-3',
        title: 'Container Handling',
        lessons: [
          { id: 'l1-7', title: 'Picking Up Containers', duration: '30 min', type: 'video' },
          { id: 'l1-8', title: 'Stacking Operations', duration: '25 min', type: 'video' },
          { id: 'l1-9', title: 'Load Charts & Weight Limits', duration: '20 min', type: 'video' },
        ],
      },
    ],
  },
  {
    id: '2',
    slug: 'crane-safety-operations',
    title: 'Crane Safety & Operations',
    subtitle: 'Industrial crane certification program',
    description: 'Master the fundamentals of crane operations including rigging, signaling, and load calculations. This program meets international safety standards for crane operators.',
    image: craneImg,
    duration: '5 hours',
    level: 'Advanced',
    language: 'English',
    rating: 4.9,
    studentsEnrolled: 189,
    instructor: instructors[0],
    certification: true,
    visible: true,
    whatYouWillLearn: [
      'Calculate load weights and crane capacities',
      'Interpret crane load charts',
      'Perform rigging operations safely',
      'Use standard hand and radio signals',
      'Conduct crane inspections',
      'Respond to emergency situations',
    ],
    requirements: [
      'Basic mechanical knowledge',
      'Completed basic safety training',
      'Minimum 1 year industrial experience',
    ],
    includes: [
      'Certificate of completion',
      '5 hours of video content',
      'Load calculation worksheets',
      'Signal reference cards',
      'Final examination',
    ],
    sections: [
      {
        id: 's2-1',
        title: 'Crane Fundamentals',
        lessons: [
          { id: 'l2-1', title: 'Types of Cranes', duration: '20 min', type: 'video' },
          { id: 'l2-2', title: 'Components & Terminology', duration: '25 min', type: 'video' },
          { id: 'l2-3', title: 'Safety Standards Overview', duration: '15 min', type: 'pdf' },
        ],
      },
      {
        id: 's2-2',
        title: 'Load Management',
        lessons: [
          { id: 'l2-4', title: 'Load Charts Explained', duration: '30 min', type: 'video' },
          { id: 'l2-5', title: 'Weight Calculations', duration: '25 min', type: 'video' },
          { id: 'l2-6', title: 'Center of Gravity', duration: '20 min', type: 'video' },
        ],
      },
    ],
  },
  {
    id: '3',
    slug: 'forklift-certification',
    title: 'Forklift Certification',
    subtitle: 'Warehouse and industrial forklift training',
    description: 'Complete forklift operator training covering warehouse operations, safety protocols, and certification requirements. Ideal for new operators and refresher training.',
    image: forkliftImg,
    duration: '24 hours',
    level: 'Basic',
    language: 'English',
    rating: 4.7,
    studentsEnrolled: 412,
    instructor: instructors[1],
    certification: true,
    visible: true,
    whatYouWillLearn: [
      'Operate counterbalance and reach forklifts',
      'Perform safe loading and unloading',
      'Navigate warehouse environments',
      'Understand load stability principles',
      'Complete pre-shift inspections',
      'Handle hazardous materials safely',
    ],
    requirements: [
      'No prior experience required',
      'Valid ID',
      'Physical fitness for equipment operation',
    ],
    includes: [
      'Certificate of completion',
      '24 hours of video content',
      'Inspection checklists',
      'Practice quizzes',
    ],
    sections: [
      {
        id: 's3-1',
        title: 'Forklift Basics',
        lessons: [
          { id: 'l3-1', title: 'Types of Forklifts', duration: '15 min', type: 'video' },
          { id: 'l3-2', title: 'Controls & Dashboard', duration: '20 min', type: 'video' },
        ],
      },
      {
        id: 's3-2',
        title: 'Safe Operation',
        lessons: [
          { id: 'l3-3', title: 'Driving Techniques', duration: '25 min', type: 'video' },
          { id: 'l3-4', title: 'Loading & Unloading', duration: '20 min', type: 'video' },
          { id: 'l3-5', title: 'Safety Quiz', duration: '10 min', type: 'quiz' },
        ],
      },
    ],
  },
  {
    id: '4',
    slug: 'port-terminal-management',
    title: 'Port Terminal Management',
    subtitle: 'Strategic operations and logistics management',
    description: 'Advanced course covering port terminal planning, logistics optimization, and operational management for supervisors and managers.',
    image: portTerminalImg,
    duration: '4 hours',
    level: 'Advanced',
    language: 'English',
    rating: 4.6,
    studentsEnrolled: 97,
    instructor: instructors[0],
    certification: true,
    visible: true,
    whatYouWillLearn: [
      'Plan terminal operations efficiently',
      'Optimize container yard layouts',
      'Manage vessel scheduling',
      'Coordinate multi-modal transport',
      'Implement KPI tracking systems',
      'Lead operational teams',
    ],
    requirements: [
      'Minimum 3 years port industry experience',
      'Supervisory experience recommended',
    ],
    includes: [
      'Certificate of completion',
      '4 hours of video content',
      'Case study materials',
      'Management templates',
    ],
    sections: [
      {
        id: 's4-1',
        title: 'Terminal Planning',
        lessons: [
          { id: 'l4-1', title: 'Yard Layout Design', duration: '30 min', type: 'video' },
          { id: 'l4-2', title: 'Berth Allocation', duration: '25 min', type: 'video' },
        ],
      },
      {
        id: 's4-2',
        title: 'Operations Management',
        lessons: [
          { id: 'l4-3', title: 'Shift Planning', duration: '20 min', type: 'video' },
          { id: 'l4-4', title: 'KPI Framework', duration: '25 min', type: 'video' },
          { id: 'l4-5', title: 'Case Study Analysis', duration: '15 min', type: 'pdf' },
        ],
      },
    ],
  },
  {
    id: '5',
    slug: 'heavy-equipment-maintenance',
    title: 'Heavy Equipment Maintenance',
    subtitle: 'Preventive and corrective maintenance programs',
    description: 'Learn maintenance protocols for heavy industrial equipment including hydraulic systems, engines, and electrical components.',
    image: heavyEquipmentImg,
    duration: '3 hours',
    level: 'Intermediate',
    language: 'English',
    rating: 4.5,
    studentsEnrolled: 156,
    instructor: instructors[0],
    certification: true,
    visible: true,
    whatYouWillLearn: [
      'Diagnose common equipment failures',
      'Perform preventive maintenance routines',
      'Service hydraulic systems',
      'Read electrical schematics',
      'Maintain maintenance logs',
      'Order and manage spare parts',
    ],
    requirements: [
      'Basic mechanical aptitude',
      'Familiarity with hand tools',
    ],
    includes: [
      'Certificate of completion',
      '3 hours of video content',
      'Maintenance schedule templates',
      'Troubleshooting guides',
    ],
    sections: [
      {
        id: 's5-1',
        title: 'Maintenance Fundamentals',
        lessons: [
          { id: 'l5-1', title: 'Preventive vs Corrective', duration: '20 min', type: 'video' },
          { id: 'l5-2', title: 'Maintenance Planning', duration: '25 min', type: 'video' },
        ],
      },
      {
        id: 's5-2',
        title: 'Hydraulic Systems',
        lessons: [
          { id: 'l5-3', title: 'Hydraulic Basics', duration: '30 min', type: 'video' },
          { id: 'l5-4', title: 'Troubleshooting Leaks', duration: '20 min', type: 'video' },
        ],
      },
    ],
  },
  {
    id: '6',
    slug: 'workplace-safety-ppe',
    title: 'Workplace Safety & PPE',
    subtitle: 'Essential safety training for industrial environments',
    description: 'Foundational safety course covering personal protective equipment, hazard identification, and emergency response procedures for all industrial workers.',
    image: safetyImg,
    duration: '3 hours',
    level: 'Basic',
    language: 'English',
    rating: 4.8,
    studentsEnrolled: 523,
    instructor: instructors[1],
    certification: true,
    visible: true,
    whatYouWillLearn: [
      'Identify workplace hazards',
      'Select appropriate PPE for each task',
      'Follow lockout/tagout procedures',
      'Respond to chemical spills',
      'Perform basic first aid',
      'Report incidents correctly',
    ],
    requirements: [
      'No prior experience required',
    ],
    includes: [
      'Certificate of completion',
      '3 hours of video content',
      'PPE selection guide',
      'Emergency response cards',
      'Safety audit checklists',
    ],
    sections: [
      {
        id: 's6-1',
        title: 'Hazard Awareness',
        lessons: [
          { id: 'l6-1', title: 'Types of Workplace Hazards', duration: '20 min', type: 'video', videoUrl: 'https://www.youtube.com/watch?v=Jv85rhYojYs' },
          { id: 'l6-2', title: 'Risk Assessment Basics', duration: '15 min', type: 'video', videoUrl: 'https://www.youtube.com/watch?v=WkTvuj4yapY' },
        ],
      },
      {
        id: 's6-2',
        title: 'Personal Protective Equipment',
        lessons: [
          { id: 'l6-3', title: 'PPE Categories', duration: '20 min', type: 'video', videoUrl: 'https://www.youtube.com/watch?v=-4gu3LkQhP0' },
          { id: 'l6-4', title: 'Proper Use & Maintenance', duration: '15 min', type: 'video', videoUrl: 'https://www.youtube.com/watch?v=gRRJbIpAROs' },
          { id: 'l6-5', title: 'PPE Selection Guide', duration: '10 min', type: 'pdf' },
        ],
      },
      {
        id: 's6-3',
        title: 'Emergency Procedures',
        lessons: [
          { id: 'l6-6', title: 'Emergency Response Plan', duration: '25 min', type: 'video', videoUrl: 'https://www.youtube.com/watch?v=IAl0KE7iRBg' },
          { id: 'l6-7', title: 'First Aid Basics', duration: '20 min', type: 'video', videoUrl: 'https://www.youtube.com/watch?v=mB7H9js4xHs' },
          { id: 'l6-8', title: 'Final Assessment', duration: '15 min', type: 'quiz' },
        ],
      },
    ],
  },
];
