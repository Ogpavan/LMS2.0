import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const dummyCourseData = {
  1: {
    title: "React Basics",
    description:
      "Learn the fundamentals of React. This course covers everything you need to get started with React, including components, JSX, props, state, and hooks. You'll build several small projects and gain hands-on experience with modern React development. By the end, you'll be able to create interactive UIs and understand the core concepts behind React's architecture.",
    chapters: [
      {
        id: 1,
        title: "Introduction to React",
        videoUrl: "https://example.com/video1.mp4",
        duration: "10:30",
        locked: false,
      },
      {
        id: 2,
        title: "Components and JSX",
        videoUrl: "https://example.com/video2.mp4",
        duration: "15:45",
        locked: false,
      },
      {
        id: 3,
        title: "Props and State",
        videoUrl: "https://example.com/video3.mp4",
        duration: "12:20",
        locked: true, // Example locked chapter
      },
    ],
  },
  2: {
    title: "Advanced JavaScript",
    description:
      "Deep dive into modern JavaScript. This course explores ES6+ features, asynchronous programming, closures, and advanced patterns. You'll learn how to write clean, efficient, and maintainable code, and understand how JavaScript works under the hood. Perfect for those looking to master JavaScript for frontend or backend development.",
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

const dummyComments = [
  {
    id: 1,
    user: "Alice",
    comment: "Great explanation! The React basics are now much clearer.",
    date: "2025-12-03",
  },
  {
    id: 2,
    user: "Bob",
    comment: "Loved the chapter on JSX. Very easy to follow.",
    date: "2025-12-03",
  },
  {
    id: 3,
    user: "Charlie",
    comment: "Can you add more examples for hooks?",
    date: "2025-12-02",
  },
];

function CourseView() {
  const { courseId } = useParams();
  const [selectedChapter, setSelectedChapter] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(dummyComments);

  const course = dummyCourseData[courseId];

  if (!course) {
    return <div className="p-6">Course not found</div>;
  }

  const currentChapter = course.chapters[selectedChapter];

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      setComments([
        {
          id: comments.length + 1,
          user: "You",
          comment: commentText,
          date: new Date().toISOString().slice(0, 10),
        },
        ...comments,
      ]);
      setCommentText("");
    }
  };

  return (
    <div className="flex flex-col  md:flex-row-reverse gap-6">
      {/* Chapters Sidebar - Sticky on left like YouTube playlist */}
      <div className="w-full md:w-80 md:sticky md:top-4 h-[220px] md:h-auto md:max-h-[600px] border-l border-border overflow-y-auto bg-white dark:bg-gray-900 rounded-lg md:rounded-none self-start">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold mb-3">Course Content</h3>
          <div className="space-y-2">
            {course.chapters.map((chapter, index) => (
              <div
                key={chapter.id}
                className={`cursor-pointer transition-colors rounded-md flex items-center ${
                  selectedChapter === index
                    ? "border border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                    : "hover:bg-muted"
                } ${chapter.locked ? "opacity-60 cursor-not-allowed" : ""}`}
                onClick={() => !chapter.locked && setSelectedChapter(index)}
                title={chapter.locked ? "Locked chapter" : ""}
              >
                <div className="px-3 pt-2 flex items-center justify-between w-full">
                  <div>
                    <h4 className="text-sm font-medium leading-tight flex items-center gap-1">
                      {chapter.title}
                      {chapter.locked && (
                        <span
                          className="ml-1 text-xs text-gray-500"
                          aria-label="Locked"
                        >
                          🔒
                        </span>
                      )}
                    </h4>
                    <p className="text-xs opacity-75">{chapter.duration}</p>
                  </div>
                  <div className="ml-2 text-xs opacity-50">{index + 1}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Player & Description/Comments */}
      <div className="flex-1 flex flex-col items-center">
        <div className="w-full max-w-3xl aspect-video rounded-lg bg-black flex items-center justify-center relative">
          {/* Video Placeholder */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-4">
            <h3 className="text-lg md:text-xl mb-2 font-semibold text-center">
              {currentChapter?.title}
            </h3>
            <p className="text-gray-400 text-center">
              Video Player Placeholder
            </p>
            <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-0.5 rounded">
              {currentChapter?.duration}
            </span>
          </div>
        </div>
        {/* Description & Comments Section */}
        <div className="w-full max-w-3xl mt-4 bg-white dark:bg-gray-900 rounded-lg   p-2">
          {/* Long Description */}
          <h2 className="text-lg font-bold mb-1">{currentChapter?.title}</h2>
          <p className="text-sm text-muted-foreground mb-3">
            {course.description}
          </p>
          <hr className="my-3" />
          <h4 className="font-semibold mb-2">Chapter Description</h4>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
            Duration: {currentChapter?.duration}
          </p>
          {/* Comments */}
          <div>
            <h4 className="font-semibold mb-2">Comments</h4>
            <form onSubmit={handleCommentSubmit} className="mb-4 flex gap-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 px-3 py-2 border rounded-lg text-sm bg-gray-100 dark:bg-gray-800"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
              >
                Comment
              </button>
            </form>
            <div className="space-y-3">
              {comments.map((c) => (
                <div key={c.id} className="border-b pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">{c.user}</span>
                    <span className="text-xs text-gray-400">{c.date}</span>
                  </div>
                  <p className="text-sm mt-1">{c.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseView;
