import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import type { Course } from "../../types";
import type { UserData } from "../../types";
import config from "../../config";
export function CourseManagement() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [instructors, setInstructors] = useState<UserData[]>([]);
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [isEditingCourse, setIsEditingCourse] = useState(false);
  const [courseToEdit, setCourseToEdit] = useState<Course | null>(null);
  const [newCourse, setNewCourse] = useState<Partial<Course>>({
    name: "",
    description: "",
    duration: "",
    instructor: "",
    fees: 0,
    technologies: [],
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${config.apiBaseUrl}/api/courses`);
        if (!response.ok) throw new Error("Failed to fetch courses");
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    const fetchInstructors = async () => {
      try {
        const response = await fetch(`${config.apiBaseUrl}/api/users`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch instructors");

        const data: UserData[] = await response.json();
        // console.log("Fetched users:", data);

        const instructorList = data.filter((user) => user.role === "staff");
        // console.log("Filtered instructors:", instructorList);
        setInstructors(instructorList);
      } catch (error) {
        console.error("Error fetching instructors:", error);
      }
    };

    fetchInstructors();
    fetchCourses();
  }, []);

  const handleAddOrEditCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !newCourse.name ||
      !newCourse.duration ||
      !newCourse.instructor ||
      !newCourse.description ||
      (newCourse.fees ?? 0) <= 0 ||
      (newCourse.technologies ?? []).length === 0
    ) {
      alert("Please fill in all fields correctly.");
      return;
    }

    const token = localStorage.getItem("token"); // Get the token from localStorage

    try {
      const method = isEditingCourse ? "PUT" : "POST";
      const url = isEditingCourse
        ? `${config.apiBaseUrl}/api/courses/${courseToEdit?._id}`
        : `${config.apiBaseUrl}/api/courses`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add the token to the headers
        },
        body: JSON.stringify(newCourse),
      });

      if (!response.ok) throw new Error("Failed to save course");

      const savedCourse = await response.json();
      setCourses((prev) =>
        isEditingCourse
          ? prev.map((course) =>
              course._id === savedCourse._id ? savedCourse : course
            )
          : [...prev, savedCourse]
      );

      setIsAddingCourse(false);
      setIsEditingCourse(false);
      setCourseToEdit(null);
      setNewCourse({
        name: "",
        description: "",
        duration: "",
        instructor: "",
        fees: 0,
        technologies: [],
      });
    } catch (error) {
      console.error("Error saving course:", error);
    }
  };

  const handleEditCourse = (course: Course) => {
    setIsEditingCourse(true);
    setCourseToEdit(course);
    setNewCourse(course);
  };

  const handleDeleteCourse = async (courseId: string) => {
    const token = localStorage.getItem("token"); // Get the token from localStorage

    try {
      const response = await fetch(
        `${config.apiBaseUrl}/api/courses/${courseId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the headers
          },
        }
      );

      if (!response.ok) throw new Error("Failed to delete course");

      setCourses((prev) => prev.filter((course) => course._id !== courseId));
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Course Management</h2>
        <button
          onClick={() => setIsAddingCourse(true)}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Course
        </button>
      </div>

      {(isAddingCourse || isEditingCourse) && (
        <form
          onSubmit={handleAddOrEditCourse}
          className="bg-white p-6 rounded-lg shadow-sm"
        >
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Course Name"
              value={newCourse.name}
              onChange={(e) =>
                setNewCourse((prev) => ({ ...prev, name: e.target.value }))
              }
              required
              className="block w-full border border-gray-300 rounded-md p-2"
            />
            <input
              type="text"
              placeholder="Duration"
              value={newCourse.duration}
              onChange={(e) =>
                setNewCourse((prev) => ({ ...prev, duration: e.target.value }))
              }
              required
              className="block w-full border border-gray-300 rounded-md p-2"
            />
            <div className="block w-full border border-gray-300 rounded-md p-2">
              <select
                required
                className="mt-1 block w-full   focus:border-blue-500 focus:ring-blue-500"
                value={newCourse.instructor}
                onChange={(e) =>
                  setNewCourse((prev) => ({
                    ...prev,
                    instructor: e.target.value,
                  }))
                }
              >
                <option value="">Select Staff</option>
                {instructors.map((staff) => (
                  <option key={staff._id} value={staff._id}>
                    {staff.name}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="number"
              placeholder="Fees"
              value={newCourse.fees}
              onChange={(e) =>
                setNewCourse((prev) => ({
                  ...prev,
                  fees: Number(e.target.value),
                }))
              }
              required
              className="block w-full border border-gray-300 rounded-md p-2"
            />
            <textarea
              placeholder="Description"
              value={newCourse.description}
              onChange={(e) =>
                setNewCourse((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              required
              className="block w-full border border-gray-300 rounded-md p-2"
            />
            <input
              type="text"
              placeholder="Technologies (comma-separated)"
              value={newCourse.technologies?.join(", ")}
              onChange={(e) =>
                setNewCourse((prev) => ({
                  ...prev,
                  technologies: e.target.value
                    .split(",")
                    .map((tech) => tech.trim()),
                }))
              }
              required
              className="block w-full border border-gray-300 rounded-md p-2"
            />
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => {
                  setIsAddingCourse(false);
                  setIsEditingCourse(false);
                  setCourseToEdit(null);
                  setNewCourse({
                    name: "",
                    description: "",
                    duration: "",
                    instructor: "",
                    fees: 0,
                    technologies: [],
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
                {isEditingCourse ? "Save Changes" : "Add Course"}
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="bg-white shadow-sm rounded-lg">
        <div className="grid grid-cols-1 divide-y divide-gray-200">
          {courses.map((course) => (
            <div key={course._id} className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {course.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {course.description}
                  </p>
                  <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                    <span>Duration: {course.duration}</span>
                    <span>
                      Instructor:{" "}
                      {instructors.find(
                        (inst) => inst._id === course.instructor
                      )?.name || "Unknown"}
                    </span>

                    <span>Fees: ₹{course.fees}</span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {course.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditCourse(course)}
                    className="p-2 text-gray-400 hover:text-blue-600"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteCourse(course._id)}
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
