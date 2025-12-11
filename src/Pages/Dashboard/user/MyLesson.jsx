import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useAuth } from "../../../Context/useAuth";
// import UpdateLessonModal from "../../Components/UpdateLessonModal"; // modal for update

const MyLessons = () => {
  const { user } = useAuth();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLesson, setSelectedLesson] = useState(null);

//   useEffect(() => {
//     if (user?._id) fetchLessons();
//   }, [user]);

//   const fetchLessons = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`/api/lessons/user/${user._id}`);
//       setLessons(res.data);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to fetch lessons");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (lessonId) => {
//     const confirm = window.confirm("Are you sure you want to delete this lesson?");
//     if (!confirm) return;

//     try {
//       await axios.delete(`/api/lessons/${lessonId}`);
//       toast.success("Lesson deleted successfully!");
//       setLessons(lessons.filter((lesson) => lesson._id !== lessonId));
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to delete lesson");
//     }
//   };
useEffect(() => {
    if (user?._id) {
      fetchLessons();
    }
  }, [user]);

  // Fake data generator
  const fetchLessons = async () => {
    setLoading(true);

    // Replace this with real API call when ready
    const fakeData = [
      {
        _id: "1",
        title: "How to Stay Motivated",
        category: "Personal Growth",
        emotionalTone: "Motivational",
        visibility: "Public",
        accessLevel: "Free",
        createdAt: new Date(),
        likes: ["user1", "user2"],
        favorites: ["user3"],
      },
      {
        _id: "2",
        title: "Career Mistakes I Learned From",
        category: "Career",
        emotionalTone: "Realization",
        visibility: "Private",
        accessLevel: "Premium",
        createdAt: new Date(),
        likes: ["user2"],
        favorites: [],
      },
      {
        _id: "3",
        title: "Importance of Gratitude",
        category: "Mindset",
        emotionalTone: "Gratitude",
        visibility: "Public",
        accessLevel: "Free",
        createdAt: new Date(),
        likes: [],
        favorites: ["user1"],
      },
    ];

    // Simulate network delay
    setTimeout(() => {
      setLessons(fakeData);
      setLoading(false);
    }, 500);
  };
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">My Lessons</h2>

      {loading ? (
        <p className="text-gray-500 dark:text-gray-300">Loading...</p>
      ) : lessons.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300">You have not added any lessons yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full bg-base-100 dark:bg-gray-800">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Emotional Tone</th>
                <th>Visibility</th>
                <th>Access</th>
                <th>Created</th>
                <th>Likes</th>
                <th>Favorites</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {lessons.map((lesson) => (
                <tr key={lesson._id} className="hover">
                  <td>{lesson.title}</td>
                  <td>{lesson.category}</td>
                  <td>{lesson.emotionalTone}</td>
                  <td>{lesson.visibility}</td>
                  <td>{lesson.accessLevel}</td>
                  <td>{new Date(lesson.createdAt).toLocaleDateString()}</td>
                  <td>{lesson.likes?.length || 0}</td>
                  <td>{lesson.favorites?.length || 0}</td>
                  <td className="flex gap-2">
                    <button
                      onClick={() => setSelectedLesson(lesson)}
                      className="btn btn-sm btn-outline btn-info flex items-center gap-1"
                    >
                      <FiEdit2 /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(lesson._id)}
                      className="btn btn-sm btn-outline btn-error flex items-center gap-1"
                    >
                      <FiTrash2 /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Update Modal */}
      {selectedLesson && (
        <UpdateLessonModal
          lesson={selectedLesson}
          onClose={() => setSelectedLesson(null)}
          onUpdate={() => {
            fetchLessons();
            setSelectedLesson(null);
          }}
        />
      )}
    </div>
  );
};

export default MyLessons;
