import React, { useState } from "react";
import { useNavigate } from "react-router";
import LessonInfoSection from "../Components/LifeLessonDetails/LessonInfoSection";
import SimilarLessons from "../Components/LifeLessonDetails/SimilarLessons";
import CommentSection from "../Components/LifeLessonDetails/CommentSection";
import StatsEngagement from "../Components/LifeLessonDetails/StatsEngagement";
import CreatorCard from "../Components/LifeLessonDetails/CreatorCard";
import LessonMetadata from "../Components/LifeLessonDetails/LessonMetadata";
import InteractionButtons from "../Components/LifeLessonDetails/InteractionButtons";
import Wraper from "../Components/Wraper";

// Fake lesson for demo
const fakeLesson = {
  _id: "1",
  title: "Growth Begins With Self-Awareness",
  description:
    "A powerful story about understanding yourself, reflecting on mistakes, and embracing growth.",
  category: "Personal Growth",
  emotionalTone: "Motivational",
  accessLevel: "premium", // free | premium
  image:
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
  createdAt: "2025-12-01",
  updatedAt: "2025-12-08",
  creator: {
    name: "Ariana Gomez",
    photoURL: "https://i.pravatar.cc/150?img=47",
    totalLessons: 12,
  },
  likesCount: 1200,
  favoritesCount: 342,
  likes: [],
  isLiked: false,
  isSaved: false,
};

const LifeLessonDetailsPage = ({ user, isPremiumUser }) => {
  const navigate = useNavigate();

  const [lesson, setLesson] = useState(fakeLesson);

  // Check premium access
  const showUpgradeBanner = lesson.accessLevel === "premium" && !isPremiumUser;
  console.log(showUpgradeBanner);

  if (!showUpgradeBanner) {
    return (
      <div className="container mx-auto p-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Premium Lesson</h1>
        <p className="text-gray-600 mb-6">
          Upgrade to premium to view the full lesson.
        </p>
        <button
          onClick={() => navigate("/upgrade-plan")}
          className="px-6 py-3 bg-yellow-400 hover:bg-yellow-600 rounded font-semibold"
        >
          Upgrade Now
        </button>
        <div className="mt-8 opacity-50 blur-sm">
          {/* Optionally show blurred preview */}
          <LessonInfoSection lesson={lesson} />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto  space-y-8">
      <div>
        <LessonInfoSection lesson={lesson} />
      </div>
      <Wraper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1.5">
          <LessonMetadata lesson={lesson} />
          <StatsEngagement lesson={lesson} />
          <CreatorCard creator={lesson.creator} />
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-4 max-w-full">
          <InteractionButtons
            lesson={lesson}
            user={user}
            setLesson={setLesson}
          />
        </div>
      </Wraper>
      <div className="mt-20 bg-gray-100 dark:bg-gray-900 py-5" >
        <Wraper>
          <CommentSection lessonId={lesson._id} user={user} />
        </Wraper>
      </div>
      <Wraper>
        <SimilarLessons currentLesson={lesson} />
      </Wraper>
    </div>
  );
};

export default LifeLessonDetailsPage;
