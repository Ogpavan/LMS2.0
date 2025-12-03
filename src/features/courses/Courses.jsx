import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const dummyCourses = [
  {
    id: 1,
    title: "React Basics",
    description:
      "Learn the fundamentals of React, including components, state, and props.",
    duration: "4 weeks",
  },
  {
    id: 2,
    title: "Advanced JavaScript",
    description: "Deep dive into ES6+, closures, async/await, and more.",
    duration: "6 weeks",
  },
  {
    id: 3,
    title: "UI/UX Design",
    description: "Principles of user interface and user experience design.",
    duration: "3 weeks",
  },
  {
    id: 4,
    title: "Node.js Essentials",
    description: "Build scalable backend applications with Node.js.",
    duration: "5 weeks",
  },
];

function Courses() {
  const navigate = useNavigate();

  const handleCourseClick = (courseId) => {
    navigate(`/dashboard/course/${courseId}`);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Browse Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        {dummyCourses.map((course) => (
          <Card
            key={course.id}
            className="p-0 rounded-lg shadow-sm border border-border max-w-xs mx-auto cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleCourseClick(course.id)}
          >
            {/* Image skeleton */}
            <div className="w-full h-30 bg-gray-200 rounded-t-lg relative animate-pulse">
              <span
                className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-0.5 rounded"
                style={{ fontSize: "0.75rem" }}
              >
                {course.duration}
              </span>
            </div>
            <CardHeader className="pb-2 pt-3 px-4">
              <CardTitle className="text-lg font-semibold leading-tight mb-1">
                {course.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-3 pt-0">
              <p className="text-xs text-muted-foreground leading-normal">
                {course.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Courses;
