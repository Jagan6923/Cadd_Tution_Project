import React from "react";
import { UserPlus, CheckCircle, Info } from "lucide-react";

type Notification = {
  id: string;
  type: "new_student" | "attendance" | "other";
  message: string;
  timestamp: string;
};

export function Notifications() {
  const [notifications] = React.useState<Notification[]>([
    {
      id: "1",
      type: "new_student",
      message: "New student Jeyaraman has registered.",
      timestamp: "2024-10-10T10:00:00Z",
    },
    {
      id: "2",
      type: "attendance",
      message: "Attendance for Batch A submitted for 2024-10-09.",
      timestamp: "2024-10-10T11:00:00Z",
    },
    {
      id: "3",
      type: "other",
      message:
        "Upcoming batch for Full Stack Development starts on 2024-10-15.",
      timestamp: "2024-10-10T12:00:00Z",
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
      </div>

      <div className="bg-white shadow-sm rounded-lg">
        <div className="grid grid-cols-1 divide-y divide-gray-200">
          {notifications.map((notification) => (
            <div key={notification.id} className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-2">
                    {notification.type === "new_student" && (
                      <UserPlus className="w-5 h-5 text-green-500" />
                    )}
                    {notification.type === "attendance" && (
                      <CheckCircle className="w-5 h-5 text-blue-500" />
                    )}
                    {notification.type === "other" && (
                      <Info className="w-5 h-5 text-gray-500" />
                    )}
                    <p className="text-lg font-medium text-gray-900">
                      {notification.message}
                    </p>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    {new Date(notification.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Notifications;
