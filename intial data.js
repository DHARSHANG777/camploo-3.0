export const INITIAL_STAFF_LIST = [
  { id: 'stf-1', name: 'Dr. A. Vance', dept: 'Computer Science & Engineering', email: 'vance@campus.edu' },
  { id: 'stf-2', name: 'Prof. Sarah Jenkins', dept: 'Electronics & Comm. Engg.', email: 's.jenkins@campus.edu' },
  { id: 'stf-3', name: 'Dr. Rajesh Kumar', dept: 'Mechanical Engineering', email: 'rkumar@campus.edu' },
  { id: 'stf-4', name: 'Dr. Meera Nair', dept: 'Information Technology', email: 'mnair@campus.edu' }
];

export const INITIAL_COURSES = [
  { code: 'CS401', name: 'Advanced Data Structures & Algorithms', conducted: 36, attended: 32 },
  { code: 'CS402', name: 'Artificial Intelligence & Neural Nets', conducted: 30, attended: 27 },
  { code: 'CS403', name: 'Cloud Native System Architecture', conducted: 32, attended: 22 },
  { code: 'CS404', name: 'Database Systems & Data Lakes', conducted: 38, attended: 35 },
  { code: 'CS405', name: 'Software Engineering & DevOps', conducted: 28, attended: 26 },
];

export const INITIAL_EVENTS = [
  {
    id: 'evt-101',
    title: 'HackNova 2026: 24-Hour National Hackathon',
    creatorName: 'Tech Club TechX',
    category: 'Hackathon',
    startDate: '2026-10-15',
    endDate: '2026-10-16',
    venue: 'Main Auditorium & Innovation Lab',
    description: 'Build futuristic Web3, AI, and IoT solutions for smart campus infrastructure. Cash prizes up to $5,000!',
    maxCapacity: 300,
    registeredStudents: [
      { name: 'Alex Rivera', rollNo: 'CS2023089', email: 'alex@student.edu', registeredAt: '2026-09-10' }
    ]
  },
  {
    id: 'evt-102',
    title: 'CyberSec Matrix Workshop',
    creatorName: 'Cybersecurity Cell',
    category: 'Workshop',
    startDate: '2026-09-28',
    endDate: '2026-09-29',
    venue: 'CS Seminar Hall B',
    description: 'Hands-on practical workshop covering ethical hacking, network penetration testing, and modern application security.',
    maxCapacity: 120,
    registeredStudents: []
  },
  {
    id: 'evt-103',
    title: 'Annual Robotics Expo & Combat Arena',
    creatorName: 'Robotics Guild',
    category: 'Exhibition',
    startDate: '2026-11-04',
    endDate: '2026-11-05',
    venue: 'Indoor Sports Complex Ground Floor',
    description: 'Showcase of autonomous rover prototypes, drone swarms, and heavyweight robot wars combat challenges.',
    maxCapacity: 450,
    registeredStudents: []
  }
];

export const INITIAL_LETTERS = [
  {
    id: 'let-101',
    type: 'OD',
    studentName: 'Alex Rivera',
    rollNo: 'CS2023089',
    date: '2026-09-30',
    reason: 'Representing the college in the Inter-University Hackathon Finals at Tech Park.',
    staffName: 'Dr. A. Vance',
    status: 'Pending',
    submittedAt: '2026-09-12'
  },
  {
    id: 'let-102',
    type: 'Leave',
    studentName: 'Alex Rivera',
    rollNo: 'CS2023089',
    date: '2026-09-18 to 2026-09-20',
    reason: '[Medical Leave] Severe viral fever and medical observation prescribed by physician.',
    staffName: 'Dr. A. Vance',
    status: 'Approved',
    approvedBy: 'Dr. A. Vance',
    approvedAt: '2026-09-13',
    submittedAt: '2026-09-08'
  }
];
