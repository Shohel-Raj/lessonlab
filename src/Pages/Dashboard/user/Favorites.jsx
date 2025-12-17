import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { toast } from "react-toastify";
import LoaderSpainer from "../../../Components/Loader/LoaderSpainer";
import { useAuth } from "../../../Context/useAuth";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [tone, setTone] = useState("");
  const { user } = useAuth();

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const token = await user.getIdToken();
      const res = await axios.get(
        `${import.meta.env.VITE_ApiCall}/my-favorites?category=${category}&tone=${tone}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFavorites(res.data.data);
    } catch (error) {
      toast.error("Failed to load favorites");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [category, tone]);

  const handleRemove = async (id) => {
    try {
      const token = await user.getIdToken();
      await axios.delete(`${import.meta.env.VITE_ApiCall}/favorites/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Removed from favorites");
      setFavorites((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      toast.error("Failed to remove");
    }
  };

  if (loading) return <LoaderSpainer />;

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        My Favorites
      </h2>

      {/* Filters */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <select
          className="border p-2 rounded bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Life">Life</option>
          <option value="Relationships">Relationships</option>
          <option value="Motivation">Motivation</option>
          <option value="Personal Growth">Personal Growth</option>
          <option value="Mistakes Learned">Mistakes Learned</option>
          <option value="Career">Career</option>
          <option value="Mindset">Mindset</option>
        </select>

        <select
          className="border p-2 rounded bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700"
          value={tone}
          onChange={(e) => setTone(e.target.value)}
        >
          <option value="">All Emotional Tones</option>
          <option value="Happy">Happy</option>
          <option value="Motivational">Motivational</option>
          <option value="Sad">Sad</option>
          <option value="Realization">Realization</option>
          <option value="Gratitude">Gratitude</option>
          <option value="Inspirational">Inspirational</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border dark:border-gray-700">
        <table className="table w-full">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr className="text-gray-700 dark:text-gray-200">
              <th>Title</th>
              <th>Category</th>
              <th>Emotional Tone</th>
              <th>Saved</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody className="bg-white dark:bg-gray-900">
            {favorites.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-gray-500 dark:text-gray-400"
                >
                  No favorites found
                </td>
              </tr>
            ) : (
              favorites.map((lesson) => (
                <tr
                  key={lesson._id}
                  className="border-t dark:border-gray-700 text-gray-700 dark:text-gray-200"
                >
                  <td className="font-medium">{lesson.title}</td>
                  <td>{lesson.category}</td>
                  <td>{lesson.emotionalTone}</td>
                  <td>{lesson.saveCount}</td>
                  <td className="flex gap-2">
                    <Link
                      to={`/lisson/${lesson._id}`}
                      className="btn btn-sm btn-primary"
                    >
                      Details
                    </Link>
                    <button
                      onClick={() => handleRemove(lesson._id)}
                      className="btn btn-sm btn-error"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Favorites;
