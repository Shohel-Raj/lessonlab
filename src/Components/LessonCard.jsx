import React from "react";
import {
  FaLock,
  FaHeart,
  FaRegHeart,
  FaBookmark,
  FaRegBookmark,
} from "react-icons/fa";
import { useNavigate } from "react-router";

// ❗ Fake Data (Replace with API later)
const fakeLesson = {
  title: "Growth Begins With Self‑Awareness",
  description:
    "A powerful reminder that understanding yourself is the first step toward intentional living and mindful decision‑making.",
  category: "Personal Growth",
  emotionalTone: "Motivational",
  accessLevel: "premium", // free | premium
  image:
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
  creator: {
    name: "Ariana Gomez",
    photoURL: "https://i.pravatar.cc/150?img=47",
  },
};

const LessonCard = ({
  lesson = fakeLesson,
  isPremiumUser = true,
  isLiked = false,
  isSaved = false,
}) => {
  const { title, description, category, emotionalTone, creator, accessLevel, image } = lesson;
  const navigate = useNavigate();
  const showLocked = accessLevel === "premium" && !isPremiumUser;

  const handleLike = () => {
    console.log("Like clicked");
    // Add your logic here
  };

  const handleSave = () => {
    console.log("Save clicked");
    // Add your logic here
  };

  const handleViewDetails = () => {
    if (showLocked) {
      navigate("/taka"); // route for upgrade
    } else {
      navigate(`/lisson/${1}`); // route for normal view
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 dark:bg-gray-800 dark:text-gray-100">
      {/* IMAGE */}
      <div className="relative">
        <img src={image} alt={title} className="w-full h-48 object-cover" />

        {showLocked && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
            <FaLock className="text-white text-3xl" />
          </div>
        )}
      </div>

      {/* BODY */}
      <div className="p-4 flex flex-col justify-between h-full">
        <h2 className="text-lg font-semibold mb-2 line-clamp-2">{title}</h2>

        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
          {category} • {emotionalTone}
        </p>

        <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
          {description}
        </p>

        {/* Creator + Actions */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={creator?.photoURL}
              alt={creator?.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-sm font-medium">{creator?.name}</span>
          </div>

          <div className="flex items-center gap-3 text-lg">
            <button
              onClick={handleLike}
              className="hover:text-red-500 transition"
              aria-label="like"
            >
              {isLiked ? <FaHeart /> : <FaRegHeart />}
            </button>
            <button
              onClick={handleSave}
              className="hover:text-yellow-500 transition"
              aria-label="save"
            >
              {isSaved ? <FaBookmark /> : <FaRegBookmark />}
            </button>
          </div>
        </div>

        {/* View Details Button */}
        <div className="mt-4">
          <button
            onClick={handleViewDetails}
            className={`w-full font-semibold py-2 px-4 rounded transition cursor-pointer uppercase ${
              showLocked
                ? "bg-yellow-400 hover:bg-yellow-500 text-black"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {showLocked ? "Upgrade to View" : "View Details"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonCard;
