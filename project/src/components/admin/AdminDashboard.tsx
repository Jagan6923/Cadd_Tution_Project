import { useEffect, useState } from "react";
import { useAuthStore } from "../../lib/store";

interface AdminDashboardData {
  totalStudents: number;
  activeBatches: number;
  totalCourses: number;
  recentEnrollments: { name: string; course: string; enrolledDate: string }[];
  upcomingBatches: { batch: string; startDate: string; seatsLeft: number }[];
}

function AdminDashboard() {
  const user = useAuthStore((state: { user: any }) => state.user);
  const [dashboardData, setDashboardData] = useState<AdminDashboardData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        if (user?.role !== "admin") {
          throw new Error("Unauthorized access");
        }

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
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900">Total Students</h3>
          <p className="mt-2 text-3xl font-bold text-blue-600">
            {dashboardData?.totalStudents}
          </p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900">Active Batches</h3>
          <p className="mt-2 text-3xl font-bold text-green-600">
            {dashboardData?.activeBatches}
          </p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900">Total Courses</h3>
          <p className="mt-2 text-3xl font-bold text-purple-600">
            {dashboardData?.totalCourses}
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Recent Enrollments
          </h3>
          {dashboardData && dashboardData.recentEnrollments.length > 0 ? (
            dashboardData.recentEnrollments.map((enrollment, index) => (
              <div key={index} className="border-b pb-4 mb-4 last:border-0">
                <p className="font-medium">{enrollment.name}</p>
                <p className="text-sm text-gray-500">
                  Enrolled in {enrollment.course} on {enrollment.enrolledDate}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No recent enrollments found.</p>
          )}
        </div>

        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Upcoming Batches
          </h3>
          {dashboardData && dashboardData.upcomingBatches?.length > 0 ? (
            dashboardData.upcomingBatches.map((batch, index) => (
              <div key={index} className="border-b pb-4 mb-4 last:border-0">
                <p className="font-medium">{batch.batch}</p>
                <p className="text-sm text-gray-500">
                  Starting on {batch.startDate} - {batch.seatsLeft} seats left
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No upcoming batches found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
