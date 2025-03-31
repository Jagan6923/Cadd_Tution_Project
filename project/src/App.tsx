import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { StudentEnrollment } from "./components/Students/StudentEnrollment";
import { StaffLeave } from "./components/Staff/StaffLeave";
import { LoginForm } from "./components/auth/LoginForm";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { useAuthStore } from "./lib/store";
import { CourseManagement } from "./components/admin/CourseManagement";
import { BatchManagement } from "./components/admin/BatchManagement";
import { LeaveManagement } from "./components/admin/LeaveManagement";
import StudentsList from "./components/admin/StudentsList";
import MyCoursePage from "./components/Students/StudentDashboard";
import { RegisterForm } from "./components/auth/RegisterForm";
import AdminDashboard from "./components/admin/AdminDashboard";
import StaffDashboard from "./components/Staff/StaffDashboard";

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
          <Route
            index
            element={
              userRole === "admin" ? (
                <AdminDashboard />
              ) : userRole === "staff" ? (
                <StaffDashboard />
              ) : userRole === "user" ? (
                <MyCoursePage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

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
