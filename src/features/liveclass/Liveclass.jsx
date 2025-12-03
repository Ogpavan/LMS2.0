import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideo,
  faCalendarAlt,
  faClock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const mockLiveClasses = [
  {
    id: 1,
    title: "Mathematics Live Session",
    description: "Algebra & Geometry basics",
    date: "2025-12-05",
    time: "10:00 AM - 11:00 AM",
    instructor: "Prof. John Doe",
    joinUrl: "#",
  },
  {
    id: 2,
    title: "Physics Q&A",
    description: "Newton's Laws and Applications",
    date: "2025-12-06",
    time: "2:00 PM - 3:00 PM",
    instructor: "Dr. Jane Smith",
    joinUrl: "#",
  },
];

function Liveclass() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <FontAwesomeIcon icon={faVideo} className="text-blue-600" />
        Live Classes
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        {mockLiveClasses.map((live) => (
          <Card
            key={live.id}
            className="p-0 rounded-lg shadow-sm border border-border   min-w-[300px] mx-auto hover:shadow-md transition-shadow"
          >
            {/* Image skeleton */}
            <div className="w-full h-40 bg-gray-200 rounded-t-lg relative flex items-center justify-center">
              <FontAwesomeIcon
                icon={faVideo}
                className="text-blue-500 text-2xl"
              />
              <span
                className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-0.5 rounded"
                style={{ fontSize: "0.75rem" }}
              >
                {live.time}
              </span>
            </div>
            <CardHeader className="pb-2 pt-3 px-4">
              <CardTitle className="text-lg font-semibold leading-tight mb-1">
                {live.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-3 pt-0 ">
              <p className="text-xs text-muted-foreground leading-normal mb-2">
                {live.description}
              </p>
              <div className="flex flex-col gap-1 text-xs text-gray-700 dark:text-gray-300">
                <span>
                  <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
                  {live.date}
                </span>
                <span>
                  <FontAwesomeIcon icon={faUser} className="mr-1" />
                  {live.instructor}
                </span>
              </div>
            </CardContent>
            <CardFooter className={"pb-2"}>
              <a
                href={live.joinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition text-sm"
              >
                Join Class
              </a>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Liveclass;
