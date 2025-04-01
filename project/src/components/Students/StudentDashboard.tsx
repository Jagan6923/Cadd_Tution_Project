import { useEffect, useState } from "react";

type Course = {
  _id: string;
  name: string;
  description: string;
};

const MyCoursePage = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/courses");
        if (!response.ok) throw new Error("Failed to fetch courses");
        const coursesData: Course[] = await response.json();
        setCourses(coursesData);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="space-y-6 p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-900 text-center">
        All Courses
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-[#1d4ed8] text-white rounded-lg shadow-md p-6"
          >
            <h3 className="text-xl font-semibold">{course.name}</h3>
            <p className="mt-2 text-sm">{course.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCoursePage;
