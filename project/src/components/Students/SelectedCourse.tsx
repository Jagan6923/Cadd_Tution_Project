import { useEffect, useState } from "react";
import { useAuthStore } from "../../lib/store";
import config from "../../config";
const SelectedCourse = () => {
  const user = useAuthStore((state) => state.user);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEnrollments = async () => {
      if (!user?.email) {
        setError("User email not found");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `${config.apiBaseUrl}/api/enrollments/${user.email}`
        );
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Something went wrong");
        }

        setEnrollments(data);
      } catch (err) {
        setError("Failed to load enrollments");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, [user?.email]);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

  return (
    <div className="space-y-6 p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-900 text-center">
        Your Selected Courses
      </h2>

      {enrollments.length === 0 ? (
        <p className="text-center text-gray-600">No enrollments found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrollments.map((enroll: any) => {
            const batch = enroll.batchId || {};
            const schedule = batch.schedule || {};

            return (
              <div
                key={enroll._id}
                className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition"
              >
                <h3 className="text-xl font-bold text-blue-700 mb-2">
                  {enroll.courseId?.name || "Unnamed Course"}
                </h3>

                <p className="text-gray-700 mb-3 text-sm">
                  {enroll.courseId?.description ||
                    "No course description available."}
                </p>

                <div className="text-sm space-y-1 text-gray-600">
                  <p>
                    <span className="font-semibold text-gray-800">Batch:</span>{" "}
                    {batch.name || "Not assigned"}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-800">
                      Start Date:
                    </span>{" "}
                    {batch.startDate
                      ? new Date(batch.startDate).toLocaleDateString()
                      : "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-800">
                      End Date:
                    </span>{" "}
                    {batch.endDate
                      ? new Date(batch.endDate).toLocaleDateString()
                      : "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-800">
                      Capacity:
                    </span>{" "}
                    {batch.capacity || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-800">
                      Enrolled:
                    </span>{" "}
                    {batch.enrolled || 0}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-800">
                      Schedule:
                    </span>{" "}
                    {schedule.days?.join(", ") || "Not scheduled"}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-800">Time:</span>{" "}
                    {schedule.startTime && schedule.endTime
                      ? `${schedule.startTime} - ${schedule.endTime}`
                      : "N/A"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SelectedCourse;
