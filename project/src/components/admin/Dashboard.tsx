import { useEffect, useState } from "react";
import { useAuthStore } from "../../lib/store";

interface DashboardData {
  totalStudents: number;
  activeBatches: number;
  totalCourses: number;
  recentEnrollments: { name: string; course: string; enrolledDate: string }[];
  upcomingBatches: { batch: string; startDate: string; seatsLeft: number }[];
}

function Dashboard() {
  const user = useAuthStore((state: { user: any; }) => state.user);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (user?.role === "admin") {
        try {
          const response = await fetch("http://localhost:3000/api/dashboard", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          if (!response.ok) throw new Error("Failed to fetch dashboard data");
          const data = await response.json();
          setDashboardData(data);
        } catch (error) {
          console.error("Error fetching dashboard data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  if (!dashboardData) {
    return <p>No data available.</p>;
  }

  if (user?.role === "user") {
    return (
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">My Courses</h2>
        <div className="border-b pb-4">
          <p className="font-medium">Full Stack Development</p>
          <p className="text-sm text-gray-500">Batch A - MWF 9:00-11:00</p>
          <p className="text-sm font-medium text-blue-600 mt-2">
            85% Attendance
          </p>
        </div>
      </div>
    );
  }

  if (user?.role === "staff") {
    return (
      <div className="space-y-6">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">My Batches</h3>
          <p className="font-medium">Batch A</p>
          <p className="text-sm text-gray-500">Full Stack Development</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900">Total Students</h3>
          <p className="mt-2 text-3xl font-bold text-blue-600">
            {dashboardData.totalStudents}
          </p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900">Active Batches</h3>
          <p className="mt-2 text-3xl font-bold text-green-600">
            {dashboardData.activeBatches}
          </p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900">Total Courses</h3>
          <p className="mt-2 text-3xl font-bold text-purple-600">
            {dashboardData.totalCourses}
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Recent Enrollments
          </h3>
          {dashboardData.recentEnrollments.map((student, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b pb-4 last:border-0"
            >
              <div>
                <p className="font-medium">{student.name}</p>
                <p className="text-sm text-gray-500">
                  Enrolled in {student.course}
                </p>
              </div>
              <span className="text-sm text-gray-500">
                {student.enrolledDate}
              </span>
            </div>
          ))}
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Upcoming Batches
          </h3>
          {dashboardData.upcomingBatches.map((batch, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b pb-4 last:border-0"
            >
              <div>
                <p className="font-medium">{batch.batch}</p>
                <p className="text-sm text-gray-500">
                  Starting {batch.startDate}
                </p>
              </div>
              <span className="text-sm font-medium text-blue-600">
                {batch.seatsLeft} seats left
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
