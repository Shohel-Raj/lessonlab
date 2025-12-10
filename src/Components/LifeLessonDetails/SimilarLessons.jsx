import React from "react";
import LessonCard from "../LessonCard";

// Fake lessons for similar recommendations
const fakeSimilarLessons = Array.from({ length: 6 }).map((_, i) => ({
  _id: i + 10,
  title: `Similar Lesson ${i + 1}`,
  description: "Short preview of the lesson.",
  category: "Personal Growth",
  emotionalTone: "Motivational",
  accessLevel: i % 2 === 0 ? "premium" : "free",
  image:
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
  creator: { name: "John Doe", photoURL: "https://i.pravatar.cc/150?img=32" },
}));

const SimilarLessons = ({ currentLesson }) => {
  const filtered = fakeSimilarLessons.filter(
    (l) =>
      l.category === currentLesson.category ||
      l.emotionalTone === currentLesson.emotionalTone
  );

  return (
    <div className="mt-20">
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center dark:text-white">
        Similar Lessons
      </h2>

      {/* Subheading */}
      <p className="text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto text-center">
        Explore more lessons that match your interests, emotions, and personal
        growth journey. These recommendations are curated based on your current
        lesson.
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((lesson) => (
          <div
            key={lesson._id}
            className="transform transition-all hover:-translate-y-2 hover:shadow-xl duration-300"
          >
            <LessonCard
              lesson={lesson}
              isLiked={false}
              isSaved={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarLessons;
