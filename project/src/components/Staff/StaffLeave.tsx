import React, { useState } from "react";
import { format } from "date-fns";
import type { LeaveRequest } from "../../types";

export function StaffLeave() {
  const [formData, setFormData] = useState<
    Omit<LeaveRequest, "id" | "status" | "staffId" | "appliedDate" | "_id">
  >({
    startDate: "",
    endDate: "",
    reason: "",
    type: "casual",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/leaves", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit leave request");
      }

      alert("Leave request submitted successfully!");
      setFormData({ startDate: "", endDate: "", reason: "", type: "casual" });
    } catch (error) {
      console.error("Error submitting leave request:", error);
      alert("Error submitting leave request. Please try again.");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Leave Request</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              required
              min={format(new Date(), "yyyy-MM-dd")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.startDate}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              required
              min={formData.startDate || format(new Date(), "yyyy-MM-dd")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.endDate}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Leave Type
          </label>
          <select
            name="type"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.type}
            onChange={handleInputChange}
          >
            <option value="casual">Casual Leave</option>
            <option value="sick">Sick Leave</option>
            <option value="vacation">Vacation</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Reason
          </label>
          <textarea
            name="reason"
            rows={4}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.reason}
            onChange={handleInputChange}
            placeholder="Please provide a detailed reason..."
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
}
