import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../Context/useAuth";
import LessonCard from "../Components/LessonCard";

const Profile = () => {
  const { user, reloadUser } = useAuth(); 
  const [lessons, setLessons] = useState([]);
  const [updating, setUpdating] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");

  useEffect(() => {
    if (user?._id) fetchUserLessons();
  }, [user]);

  const fetchUserLessons = async () => {
    try {
      const res = await axios.get(`/api/lessons/user/${user._id}`);
      setLessons(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch your lessons");
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      setUpdating(true);
      await axios.patch(`/api/users/${user._id}`, { name: displayName, photoURL });
      toast.success("Profile updated successfully!");
      reloadUser(); // refresh context user
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-10">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="avatar">
            <div className="w-24 h-24 rounded-full border">
              <img src={photoURL || "https://i.pravatar.cc/100"} alt="Profile" />
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{user?.name}</h2>
            <p className="text-gray-500 dark:text-gray-300">{user?.email}</p>
            {user?.isPremium && (
              <span className="inline-block mt-2 px-2 py-1 text-sm bg-yellow-400 text-black rounded">
                Premium ⭐
              </span>
            )}
            <div className="mt-4">
              <form onSubmit={handleProfileUpdate} className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                  required
                />
                <input
                  type="text"
                  placeholder="Photo URL"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                />
                <button
                  type="submit"
                  disabled={updating}
                  className="btn btn-primary mt-2"
                >
                  {updating ? "Updating..." : "Update Profile"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* User's Public Lessons */}
      <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
        Public Lessons by {user?.displayName}
      </h3>
      {lessons.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300">No lessons created yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {lessons.map((lesson) => (
            <LessonCard key={lesson._id} lesson={lesson} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
