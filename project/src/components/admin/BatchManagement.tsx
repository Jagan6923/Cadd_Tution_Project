import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Users } from "lucide-react";
import { format } from "date-fns";
import type { Batch } from "../../types";

export function BatchManagement() {
  const [batches, setBatches] = useState<Batch[]>([
    {
      id: "1",
      name: "Batch A",
      courseId: "1",
      instructorId: "1",
      startDate: "2024-04-01",
      endDate: "2024-06-30",
      capacity: 30,
      enrolled: 25,
      schedule: {
        days: ["Monday", "Wednesday", "Friday"],
        startTime: "09:00",
        endTime: "11:00",
      },
    },
  ]);

  const [isAddingBatch, setIsAddingBatch] = useState(false);
  const [isEditingBatch, setIsEditingBatch] = useState(false);
  const [batchToEdit, setBatchToEdit] = useState<Batch | null>(null);
  const [newBatch, setNewBatch] = useState<Partial<Batch>>({
    name: "",
    courseId: "",
    instructorId: "",
    startDate: "",
    endDate: "",
    capacity: 30,
    enrolled: 0,
    schedule: {
      days: [], // Initialize as an empty array
      startTime: "",
      endTime: "",
    },
  });

  useEffect(() => {
    const storedBatches = localStorage.getItem("batches");
    if (storedBatches) {
      setBatches(JSON.parse(storedBatches));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("batches", JSON.stringify(batches));
  }, [batches]);

  const handleAddBatch = (e: React.FormEvent) => {
    e.preventDefault();
    setBatches((prev) => [
      ...prev,
      { ...newBatch, id: Date.now().toString() } as Batch,
    ]);
    setIsAddingBatch(false);
    setNewBatch({
      name: "",
      courseId: "",
      instructorId: "",
      startDate: "",
      endDate: "",
      capacity: 30,
      enrolled: 0,
      schedule: {
        days: [],
        startTime: "",
        endTime: "",
      },
    });
  };

  const handleEditBatch = (batch: Batch) => {
    setIsEditingBatch(true);
    setBatchToEdit(batch);
    setNewBatch(batch);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (batchToEdit) {
      setBatches((prev) =>
        prev.map((batch) =>
          batch.id === batchToEdit.id ? { ...batch, ...newBatch } : batch
        )
      );
      setIsEditingBatch(false);
      setBatchToEdit(null);
      setNewBatch({
        name: "",
        courseId: "",
        instructorId: "",
        startDate: "",
        endDate: "",
        capacity: 30,
        enrolled: 0,
        schedule: {
          days: [],
          startTime: "",
          endTime: "",
        },
      });
    }
  };

  const handleDeleteBatch = (batchId: string) => {
    setBatches((prev) => prev.filter((batch) => batch.id !== batchId));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Batch Management</h2>
        <button
          onClick={() => setIsAddingBatch(true)}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Batch
        </button>
      </div>

      {(isAddingBatch || isEditingBatch) && (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <form
            onSubmit={isEditingBatch ? handleSaveEdit : handleAddBatch}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Batch Name
                </label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={newBatch.name}
                  onChange={(e) =>
                    setNewBatch((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Course
                </label>
                <select
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={newBatch.courseId}
                  onChange={(e) =>
                    setNewBatch((prev) => ({
                      ...prev,
                      courseId: e.target.value,
                    }))
                  }
                >
                  <option value="">Select Course</option>
                  <option value="1">Full Stack Development</option>
                  <option value="2">Mobile App Development</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <input
                  type="date"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={newBatch.startDate}
                  onChange={(e) =>
                    setNewBatch((prev) => ({
                      ...prev,
                      startDate: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  End Date
                </label>
                <input
                  type="date"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={newBatch.endDate}
                  onChange={(e) =>
                    setNewBatch((prev) => ({
                      ...prev,
                      endDate: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Capacity
                </label>
                <input
                  type="number"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={newBatch.capacity}
                  onChange={(e) =>
                    setNewBatch((prev) => ({
                      ...prev,
                      capacity: Number(e.target.value),
                    }))
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Instructor
                </label>
                <select
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={newBatch.instructorId}
                  onChange={(e) =>
                    setNewBatch((prev) => ({
                      ...prev,
                      instructorId: e.target.value,
                    }))
                  }
                >
                  <option value="">Select Instructor</option>
                  <option value="1">John Doe</option>
                  <option value="2">Jane Smith</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Start Time
                </label>
                <input
                  type="time"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={newBatch.schedule?.startTime}
                  onChange={(e) =>
                    setNewBatch((prev) => ({
                      ...prev,
                      schedule: { ...prev.schedule, startTime: e.target.value },
                    }))
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  End Time
                </label>
                <input
                  type="time"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={newBatch.schedule?.endTime}
                  onChange={(e) =>
                    setNewBatch((prev) => ({
                      ...prev,
                      schedule: { ...prev.schedule, endTime: e.target.value },
                    }))
                  }
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Schedule Days
              </label>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {[
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ].map((day) => (
                  <label key={day} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={newBatch.schedule?.days.includes(day as any)}
                      onChange={(e) => {
                        const days = e.target.checked
                          ? [...(newBatch.schedule?.days || []), day]
                          : newBatch.schedule?.days.filter((d) => d !== day) ||
                            [];
                        setNewBatch((prev) => ({
                          ...prev,
                          schedule: {
                            ...prev.schedule,
                            days: days as any[],
                            startTime: prev.schedule?.startTime || "",
                            endTime: prev.schedule?.endTime || "",
                          },
                        }));
                      }}
                    />
                    <span className="ml-2 text-sm text-gray-700">{day}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setIsAddingBatch(false);
                  setIsEditingBatch(false);
                  setBatchToEdit(null);
                  setNewBatch({
                    name: "",
                    courseId: "",
                    instructorId: "",
                    startDate: "",
                    endDate: "",
                    capacity: 30,
                    enrolled: 0,
                    schedule: {
                      days: [],
                      startTime: "",
                      endTime: "",
                    },
                  });
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                {isEditingBatch ? "Save Changes" : "Save Batch"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white shadow-sm rounded-lg">
        <div className="grid grid-cols-1 divide-y divide-gray-200">
          {batches.map((batch) => (
            <div key={batch.id} className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {batch.name}
                  </h3>
                  <div className="mt-2 grid grid-cols-2 gap-4 text-sm text-gray-500">
                    <div>
                      <p>
                        Start Date:{" "}
                        {format(new Date(batch.startDate), "MMM d, yyyy")}
                      </p>
                      <p>
                        End Date:{" "}
                        {format(new Date(batch.endDate), "MMM d, yyyy")}
                      </p>
                    </div>
                    <div>
                      <p>Schedule: {batch.schedule.days.join(", ")}</p>
                      <p>
                        Time: {batch.schedule.startTime} -{" "}
                        {batch.schedule.endTime}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500">
                      {batch.enrolled} / {batch.capacity} students
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditBatch(batch)}
                    className="p-2 text-gray-400 hover:text-blue-600"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteBatch(batch.id)}
                    className="p-2 text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
