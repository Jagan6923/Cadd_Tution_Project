import { useEffect, useState } from "react";
import { useAuthStore } from "../../lib/store";
import { Users, FileText, Calendar } from "lucide-react";

interface AdminDashboardData {
  totalStudents: number;
  activeBatches: number;
  totalCourses: number;
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
          <div className="flex items-center">
            <Users className="w-6 h-6 text-blue-600 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">
              Total Students
            </h3>
          </div>
          <p className="mt-2 text-3xl font-bold text-blue-600">
            {dashboardData?.totalStudents}
          </p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center">
            <Calendar className="w-6 h-6 text-blue-600 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">
              Active Batches
            </h3>
          </div>
          <p className="mt-2 text-3xl font-bold text-blue-600">
            {dashboardData?.activeBatches}
          </p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center">
            <FileText className="w-6 h-6 text-blue-600 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Total Courses</h3>
          </div>
          <p className="mt-2 text-3xl font-bold text-blue-600">
            {dashboardData?.totalCourses}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
