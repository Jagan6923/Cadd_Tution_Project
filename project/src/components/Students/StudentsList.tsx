import { useAuthStore } from "../../lib/store";
import { useEffect, useState } from "react";

interface UserData {
  _id: string;
  name: string;
  email: string;
  role: string;
}

const StudentsList = () => {
  const user = useAuthStore((state) => state.user);
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      if (user?.role === "admin") {
        try {
          const response = await fetch("http://localhost:3000/api/users", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          if (!response.ok) throw new Error("Failed to fetch users");
          const data = await response.json();
          setUsers(data);
        } catch (error) {
          console.error("Error fetching users:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [user]);

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold mb-4">All Users (Admin View)</h2>

      {loading ? (
        <p>Loading user details...</p>
      ) : user?.role !== "admin" ? (
        <p className="text-red-500">
          Access Denied. Only Admins can view this page.
        </p>
      ) : users.length > 0 ? (
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Email</th>
              <th className="border px-4 py-2 text-left">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b">
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default StudentsList;
