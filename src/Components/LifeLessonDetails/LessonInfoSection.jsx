import React from "react";
import Wraper from "../Wraper";

const LessonInfoSection = ({ lesson }) => {
  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
      {/* Banner */}
      <div className="h-[350px] bg-gray-200 dark:bg-gray-700 transition-colors duration-300"></div>

      {/* Content overlapping banner */}
      <Wraper>
        <div className="-mt-70 space-y-6">
          {/* Author & Date */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between text-sm text-gray-500 dark:text-gray-400 gap-2">
            <span>By {lesson.creator?.name || "Unknown Author"}</span>
            <span>{new Date(lesson.createdAt).toLocaleDateString()}</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
            {lesson.title}
          </h1>

          {/* Featured Image */}
          {lesson.image && (
            <img
              src={lesson.image}
              alt={lesson.title}
              className="w-full h-72 md:h-96 object-cover rounded-lg shadow-md transition-shadow duration-300"
            />
          )}

          {/* Description */}
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
            {lesson.description}
          </p>

          {/* Category & Tone */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
            {lesson.category && (
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded transition-colors duration-300">
                Category: {lesson.category}
              </span>
            )}
            {lesson.emotionalTone && (
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded transition-colors duration-300">
                Tone: {lesson.emotionalTone}
              </span>
            )}
          </div>
        </div>
      </Wraper>
    </div>
  );
};

export default LessonInfoSection;
