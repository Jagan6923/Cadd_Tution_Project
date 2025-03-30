import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { StudentEnrollment } from "./components/forms/StudentEnrollment";
import { StaffLeave } from "./components/forms/StaffLeave";
import { LoginForm } from "./components/auth/LoginForm";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { useAuthStore } from "./lib/store";
import { CourseManagement } from "./components/admin/CourseManagement";
import { BatchManagement } from "./components/admin/BatchManagement";
import { LeaveManagement } from "./components/admin/LeaveManagement";
import StudentsList from "./components/Students/StudentsList";
import TakeAttendance from "./components/Students/Attendence";
import Notifications from "./components/Notification/Notification";
import MyCoursePage from "./components/Students/Course";
import { RegisterForm } from "./components/auth/RegisterForm";
function Dashboard() {
  const user = useAuthStore((state) => state.user);

  if (user?.role === "user") {
    return (
      <div className="space-y-6">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">My Courses</h2>
          <div className="space-y-4">
            <div className="border-b pb-4">
              <p className="font-medium">Full Stack Development</p>
              <p className="text-sm text-gray-500">Batch A - MWF 9:00-11:00</p>
              <p className="text-sm font-medium text-blue-600 mt-2">
                85% Attendance
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (user?.role === "staff") {
    return (
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              My Batches
            </h3>
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-b pb-4 last:border-0"
                >
                  <div>
                    <p className="font-medium">
                      Batch {String.fromCharCode(64 + i)}
                    </p>
                    <p className="text-sm text-gray-500">
                      Full Stack Development
                    </p>
                  </div>
                  <button className="text-sm font-medium text-blue-600">
                    Take Attendance
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Leave Status
            </h3>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <p className="font-medium">Vacation Leave</p>
                <p className="text-sm text-gray-500">Apr 15 - Apr 20, 2024</p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mt-2">
                  Pending
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900">Total Students</h3>
          <p className="mt-2 text-3xl font-bold text-blue-600">245</p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900">Active Batches</h3>
          <p className="mt-2 text-3xl font-bold text-green-600">12</p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900">Total Courses</h3>
          <p className="mt-2 text-3xl font-bold text-purple-600">8</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Recent Enrollments
          </h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between border-b pb-4 last:border-0"
              >
                <div>
                  <p className="font-medium">Student {i}</p>
                  <p className="text-sm text-gray-500">
                    Enrolled in Full Stack Development
                  </p>
                </div>
                <span className="text-sm text-gray-500">2 days ago</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Upcoming Batches
          </h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between border-b pb-4 last:border-0"
              >
                <div>
                  <p className="font-medium">
                    Batch {String.fromCharCode(64 + i)}
                  </p>
                  <p className="text-sm text-gray-500">
                    Starting April {i * 5}, 2024
                  </p>
                </div>
                <span className="text-sm font-medium text-blue-600">
                  {10 + i} seats left
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route
            path="studentslist"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <StudentsList />
              </ProtectedRoute>
            }
          />
          <Route
            path="courses"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <CourseManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="batches"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <BatchManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="attendance"
            element={
              <ProtectedRoute allowedRoles={["admin", "staff"]}>
                <TakeAttendance />
              </ProtectedRoute>
            }
          />
          <Route
            path="notifications"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Notifications />
              </ProtectedRoute>
            }
          />
          <Route
            path="staff"
            element={
              <ProtectedRoute allowedRoles={["admin", "staff"]}>
                {useAuthStore((state) => state.user?.role) === "admin" ? (
                  <LeaveManagement />
                ) : (
                  <StaffLeave />
                )}
              </ProtectedRoute>
            }
          />
          <Route
            path="students"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <StudentEnrollment />
              </ProtectedRoute>
            }
          />
          <Route
            path="mycourses"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <MyCoursePage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
