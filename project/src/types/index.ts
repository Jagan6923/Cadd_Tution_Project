export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "staff" | "user";
  avatar?: string;
}

export interface Course {
  _id: string;
  name: string;
  description: string;
  duration: string;
  instructor: string;
  fees: number;
  technologies: string[];
}

export interface Batch {
  _id: string;
  name: string;
  courseId: string;
  instructorId: string;
  startDate: string;
  endDate: string;
  capacity: number;
  enrolled: number;
  schedule: {
    days: (
      | "Monday"
      | "Tuesday"
      | "Wednesday"
      | "Thursday"
      | "Friday"
      | "Saturday"
    )[];
    startTime: string;
    endTime: string;
  };
}

export interface Student {
  present: any;
  id: string;
  name: string;
  email: string;
  phone: string;
  guardianName: string;
  guardianPhone: string;
  enrolledCourses: string[];
  batchId?: string;
  address: string;
  dateOfBirth: string;
  enrollmentDate: string;
  status: "active" | "inactive";
}

export interface Attendance {
  id: string;
  studentId: string;
  batchId: string;
  date: string;
  status: "present" | "absent" | "late";
  notes?: string;
}

export interface LeaveRequest {
  id: string;
  staffId: string;
  startDate: string;
  endDate: string;
  reason: string;
  type: "sick" | "casual" | "vacation";
  status: "pending" | "approved" | "rejected";
  appliedDate: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "attendance" | "leave" | "general" | "course";
  read: boolean;
  createdAt: string;
}
export interface UserData {
  _id: string;
  name: string;
  email: string;
  role: string;
}
