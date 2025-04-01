import { useState, useEffect } from "react";
import { format } from "date-fns";
import type { LeaveRequest } from "../../types";
import { useAuthStore } from "../../lib/store";

export function LeaveManagement() {
  const user = useAuthStore((state) => state.user);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/leaves", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch leave requests");

        const data = await response.json();
        setLeaveRequests(data);
      } catch (err) {
        setError("Error fetching leave requests. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaveRequests();
  }, [user]);

  const handleStatusChange = async (
    requestId: string,
    newStatus: LeaveRequest["status"]
  ) => {
    console.log(
      "Updating Leave Request ID:",
      requestId,
      "New Status:",
      newStatus
    );

    if (!requestId || requestId === "undefined") {
      alert("Invalid request ID!");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/leaves/${requestId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error updating leave status:", errorData.message);
        alert(`Error updating leave status: ${errorData.message}`);
        return;
      }

      const successData = await response.json();
      console.log("Leave status updated successfully:", successData.message);

      if (newStatus === "rejected") {
        setLeaveRequests((prev) =>
          prev.filter((request) => request._id !== requestId)
        );
      } else {
        setLeaveRequests((prev) =>
          prev.map((request) =>
            request._id === requestId
              ? { ...request, status: newStatus }
              : request
          )
        );
      }
    } catch (err) {
      console.error("Error updating leave status:", err);
      alert("Error updating leave status. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Leave Requests</h2>

      {loading && <p>Loading leave requests...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="bg-white shadow-sm rounded-lg">
        <div className="grid grid-cols-1 divide-y divide-gray-200">
          {leaveRequests.length === 0 && !loading ? (
            <p className="p-6 text-gray-500">No leave requests found.</p>
          ) : (
            leaveRequests.map((request) => (
              <div key={request._id} className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-medium text-gray-900">
                        Staff:{" "}
                        {typeof request.staffId === "string"
                          ? request.staffId // Just show the ID if not populated
                          : request.staffId?.name || "Unknown Staff"}
                      </h3>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          request.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : request.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {request.status.charAt(0).toUpperCase() +
                          request.status.slice(1)}
                      </span>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-4 text-sm text-gray-500">
                      <div>
                        <p>
                          Type:{" "}
                          {request.type.charAt(0).toUpperCase() +
                            request.type.slice(1)}
                        </p>
                        <p>
                          Applied:{" "}
                          {format(new Date(request.appliedDate), "MMM d, yyyy")}
                        </p>
                      </div>
                      <div>
                        <p>
                          Start:{" "}
                          {format(new Date(request.startDate), "MMM d, yyyy")}
                        </p>
                        <p>
                          End:{" "}
                          {format(new Date(request.endDate), "MMM d, yyyy")}
                        </p>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">
                      Reason: {request.reason}
                    </p>
                  </div>
                  {request.status === "pending" && user?.role === "admin" && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() =>
                          handleStatusChange(request._id, "approved")
                        }
                        className="px-3 py-1 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() =>
                          handleStatusChange(request._id, "rejected")
                        }
                        className="px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
