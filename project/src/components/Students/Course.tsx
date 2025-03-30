import React from "react";
import { Download } from "lucide-react";

type Course = {
  id: string;
  name: string;
  description: string;
  documents: {
    id: string;
    title: string;
    url: string;
  }[];
};

const MyCoursePage = () => {
  const courses: Course[] = [
    {
      id: "1",
      name: "Full Stack Development",
      description: "Learn the fundamentals of full stack development.",
      documents: [
        {
          id: "1",
          title: "Introduction to Full Stack Development",
          url: "https://example.com/docs/full-stack-intro.pdf",
        },
        {
          id: "2",
          title: "Building RESTful APIs",
          url: "https://example.com/docs/restful-apis.pdf",
        },
      ],
    },
    {
      id: "2",
      name: "Mobile App Development",
      description: "Explore mobile app development with React Native.",
      documents: [
        {
          id: "3",
          title: "Getting Started with React Native",
          url: "https://example.com/docs/react-native-intro.pdf",
        },
        {
          id: "4",
          title: "Advanced React Native Techniques",
          url: "https://example.com/docs/react-native-advanced.pdf",
        },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">My Courses</h2>
      </div>

      <div className="bg-white shadow-sm rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-lg font-medium text-gray-900">
                {course.name}
              </h3>
              <p className="mt-2 text-sm text-gray-500">{course.description}</p>
              <div className="mt-4 space-y-2">
                {course.documents.map((document) => (
                  <div key={document.id} className="flex items-center">
                    <Download className="w-5 h-5 text-blue-500 mr-2" />
                    <a
                      href={document.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-blue-600 hover:underline"
                    >
                      {document.title}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyCoursePage;
