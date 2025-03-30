import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import type { Course } from "../../types";

export function CourseManagement() {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: "1",
      name: "Full Stack Development",
      description: "Complete web development bootcamp",
      duration: "12 weeks",
      instructor: "John Doe",
      fees: 999,
      technologies: ["React", "Node.js", "MongoDB"],
    },
  ]);
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
    const storedCourses = localStorage.getItem("courses");
    if (storedCourses) {
      setCourses(JSON.parse(storedCourses));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("courses", JSON.stringify(courses));
  }, [courses]);

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    setCourses((prev) => [
      ...prev,
      { ...newCourse, id: Date.now().toString() } as Course,
    ]);
    setIsAddingCourse(false);
    setNewCourse({
      name: "",
      description: "",
      duration: "",
      instructor: "",
      fees: 0,
      technologies: [],
    });
  };

  const handleEditCourse = (course: Course) => {
    setIsEditingCourse(true);
    setCourseToEdit(course);
    setNewCourse(course);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (courseToEdit) {
      setCourses((prev) =>
        prev.map((course) =>
          course.id === courseToEdit.id ? { ...course, ...newCourse } : course
        )
      );
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
    }
  };

  const handleDeleteCourse = (courseId: string) => {
    setCourses((prev) => prev.filter((course) => course.id !== courseId));
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
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <form
            onSubmit={isEditingCourse ? handleSaveEdit : handleAddCourse}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Course Name
                </label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={newCourse.name}
                  onChange={(e) =>
                    setNewCourse((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Duration
                </label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={newCourse.duration}
                  onChange={(e) =>
                    setNewCourse((prev) => ({
                      ...prev,
                      duration: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Instructor
                </label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={newCourse.instructor}
                  onChange={(e) =>
                    setNewCourse((prev) => ({
                      ...prev,
                      instructor: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Fees
                </label>
                <input
                  type="number"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={newCourse.fees}
                  onChange={(e) =>
                    setNewCourse((prev) => ({
                      ...prev,
                      fees: Number(e.target.value),
                    }))
                  }
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                required
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={newCourse.description}
                onChange={(e) =>
                  setNewCourse((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Technologies (comma-separated)
              </label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={newCourse.technologies?.join(", ")}
                onChange={(e) =>
                  setNewCourse((prev) => ({
                    ...prev,
                    technologies: e.target.value
                      .split(",")
                      .map((t) => t.trim()),
                  }))
                }
              />
            </div>
            <div className="flex justify-end space-x-3">
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
                {isEditingCourse ? "Save Changes" : "Save Course"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white shadow-sm rounded-lg">
        <div className="grid grid-cols-1 divide-y divide-gray-200">
          {courses.map((course) => (
            <div key={course.id} className="p-6">
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
                    <span>Instructor: {course.instructor}</span>
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
                    onClick={() => handleDeleteCourse(course.id)}
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
