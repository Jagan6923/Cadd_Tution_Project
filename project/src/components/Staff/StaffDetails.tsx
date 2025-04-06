import { useEffect, useState } from "react";
import { useAuthStore } from "../../lib/store";

const StaffDetails = () => {
  const user = useAuthStore((state) => state.user);
  const email = user?.email;

  interface Batch {
    _id: string;
    name: string;
    courseId?: {
      name: string;
      description?: string;
    };
    schedule?: {
      days?: string[];
      startTime?: string;
      endTime?: string;
    };
    startDate: string;
    endDate: string;
    enrolled: number;
    capacity: number;
  }

  const [classes, setClasses] = useState<Batch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClasses = async () => {
      if (!email) {
        setError("User email not found");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `http://localhost:3000/api/batches/staff/${encodeURIComponent(email)}`
        );

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.message || "Failed to fetch");
        }

        const data = await res.json();
        setClasses(data);
      } catch (err) {
        console.error("Failed to fetch staff classes:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, [email]);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

  return (
    <div className="space-y-6 p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-900 text-center">
        My Assigned Classes
      </h2>

      {classes.length === 0 ? (
        <p className="text-center text-gray-600">No classes assigned yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((batch) => (
            <div
              key={batch._id}
              className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold text-blue-700 mb-2">
                {batch.name}
              </h3>

              <p className="text-gray-700 mb-3 text-sm">
                {batch.courseId?.description ||
                  "No course description available."}
              </p>

              <div className="text-sm space-y-1 text-gray-600">
                <p>
                  <span className="font-semibold text-gray-800">Course:</span>{" "}
                  {batch.courseId?.name || "Unnamed"}
                </p>
                <p>
                  <span className="font-semibold text-gray-800">
                    Start Date:
                  </span>{" "}
                  {new Date(batch.startDate).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-semibold text-gray-800">End Date:</span>{" "}
                  {new Date(batch.endDate).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-semibold text-gray-800">Capacity:</span>{" "}
                  {batch.capacity}
                </p>
                <p>
                  <span className="font-semibold text-gray-800">Enrolled:</span>{" "}
                  {batch.enrolled}
                </p>
                <p>
                  <span className="font-semibold text-gray-800">Schedule:</span>{" "}
                  {batch.schedule?.days?.join(", ") || "Not scheduled"}
                </p>
                <p>
                  <span className="font-semibold text-gray-800">Time:</span>{" "}
                  {batch.schedule?.startTime && batch.schedule?.endTime
                    ? `${batch.schedule.startTime} - ${batch.schedule.endTime}`
                    : "N/A"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StaffDetails;
