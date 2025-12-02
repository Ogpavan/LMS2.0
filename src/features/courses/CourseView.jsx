import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const dummyCourseData = {
  1: {
    title: "React Basics",
    description: "Learn the fundamentals of React",
    chapters: [
      {
        id: 1,
        title: "Introduction to React",
        videoUrl: "https://example.com/video1.mp4",
        duration: "10:30",
      },
      {
        id: 2,
        title: "Components and JSX",
        videoUrl: "https://example.com/video2.mp4",
        duration: "15:45",
      },
      {
        id: 3,
        title: "Props and State",
        videoUrl: "https://example.com/video3.mp4",
        duration: "12:20",
      },
    ],
  },
  2: {
    title: "Advanced JavaScript",
    description: "Deep dive into modern JavaScript",
    chapters: [
      {
        id: 1,
        title: "ES6+ Features",
        videoUrl: "https://example.com/video4.mp4",
        duration: "18:15",
      },
      {
        id: 2,
        title: "Async/Await",
        videoUrl: "https://example.com/video5.mp4",
        duration: "14:30",
      },
      {
        id: 3,
        title: "Closures",
        videoUrl: "https://example.com/video6.mp4",
        duration: "16:45",
      },
    ],
  },
};

function CourseView() {
  const { courseId } = useParams();
  const [selectedChapter, setSelectedChapter] = useState(0);
  const course = dummyCourseData[courseId];

  if (!course) {
    return <div className="p-6">Course not found</div>;
  }

  const currentChapter = course.chapters[selectedChapter];

  return (
    <div className="flex ">
      {/* Video Player Section */}
      <div className="flex-1  border border-red-500 rounded-2xl  flex items-center justify-center">
        <div className="w-full max-w-4xl aspect-video   rounded-lg flex items-center justify-center">
          <div className="text-white text-center">
            <h3 className="text-xl mb-2">{currentChapter?.title}</h3>
            <p className="text-gray-400">Video Player Placeholder</p>
            <p className="text-sm text-gray-500 mt-2">
              Duration: {currentChapter?.duration}
            </p>
          </div>
        </div>
      </div>

      {/* Chapters Sidebar */}
      <div className="w-80   border-l border-border overflow-y-auto">
        <div className="p-4 border-b border-border">
          <h2 className="text-xl font-bold">{course.title}</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {course.description}
          </p>
        </div>

        <div className="p-4">
          <h3 className="font-semibold mb-3">Course Content</h3>
          <div className="space-y-2">
            {course.chapters.map((chapter, index) => (
              <Card
                key={chapter.id}
                className={`cursor-pointer transition-colors ${
                  selectedChapter === index
                    ? " border border-blue-600"
                    : "hover:bg-muted"
                }`}
                onClick={() => setSelectedChapter(index)}
              >
                <CardContent className="p-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium leading-tight">
                        {chapter.title}
                      </h4>
                      <p className="text-xs opacity-75 mt-1">
                        {chapter.duration}
                      </p>
                    </div>
                    <div className="ml-2 text-xs opacity-50">{index + 1}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseView;
