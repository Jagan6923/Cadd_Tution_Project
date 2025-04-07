import { useAuthStore } from "../../lib/store";
import { useEffect, useState } from "react";
import config from "../../config";
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

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/api/users`, {
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
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const res = await fetch(`${config.apiBaseUrl}/api/users/${userId}/role`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (!res.ok) throw new Error("Failed to update role");

      const updatedUser = await res.json();
      setUsers((prev) =>
        prev.map((u) =>
          u._id === userId ? { ...u, role: updatedUser.role } : u
        )
      );
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  useEffect(() => {
    if (user?.role === "admin") {
      fetchUsers();
    } else {
      setLoading(false);
    }
  }, [user]);

  return (
    <div className="rounded-lgp-6 shadow-sm">
      <h2 className="text-2xl font-bold mb-4">All Users </h2>

      {loading ? (
        <p>Loading user details...</p>
      ) : user?.role !== "admin" ? (
        <p className="text-red-500">
          Access Denied. Only Admins can view this page.
        </p>
      ) : users.length > 0 ? (
        <table className="min-w-full border border-gray-200 ">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Email</th>
              <th className="border px-4 py-2 text-left">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-b even:bg-white odd:bg-gray-50">
                <td className="border px-4 py-2">{u.name}</td>
                <td className="border px-4 py-2">{u.email}</td>
                <td className="border px-4 py-2">
                  <select
                    value={u.role}
                    onChange={(e) => handleRoleChange(u._id, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  >
                    <option value="user"> User</option>
                    <option value="staff"> Staff</option>
                    <option value="admin"> Admin</option>
                  </select>
                </td>
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
