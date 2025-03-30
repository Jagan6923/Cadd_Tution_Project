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
import Dashboard from "./components/admin/Dashboard";

function App() {
  const userRole = useAuthStore((state) => state.user?.role);

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
                {userRole === "admin" ? <LeaveManagement /> : <StaffLeave />}
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
