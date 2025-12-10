import React, { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  FiHeart,
  FiBookmark,
  FiFlag,
  FiShare2,
  FiX,
} from "react-icons/fi";

// --- Fake API calls (replace with axios.secure later) ---
const fakeApi = {
  toggleLike: async ({ lessonId, userId, isLiked }) => {
    await new Promise((res) => setTimeout(res, 300));
    return { success: true, newState: !isLiked };
  },
  toggleSave: async ({ lessonId, userId }) => {
    await new Promise((res) => setTimeout(res, 300));
    return { success: true };
  },
  reportLesson: async ({ lessonId, reporterUserId, reason }) => {
    await new Promise((res) => setTimeout(res, 500));
    return { success: true };
  },
};

const reportReasons = [
  "Inappropriate Content",
  "Hate Speech or Harassment",
  "Misleading or False Information",
  "Spam or Promotional Content",
  "Sensitive or Disturbing Content",
  "Other",
];

const InteractionButtons = ({ lesson, user, setLesson }) => {
  const [reportModal, setReportModal] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");

  // ---------------------------------------
  //   LIKE HANDLER
  // ---------------------------------------
  const handleLike = async () => {
    if (!user) {
      toast.info("Please log in to like");
      return;
    }

    const isLiked = lesson.isLiked;

    // optimistic UI update
    setLesson({
      ...lesson,
      isLiked: !isLiked,
      likesCount: isLiked ? lesson.likesCount - 1 : lesson.likesCount + 1,
    });

    const res = await fakeApi.toggleLike({
      lessonId: lesson._id,
      userId: user.uid,
      isLiked,
    });

    if (!res.success) {
      toast.error("Failed to update like");
    }
  };

  // ---------------------------------------
  //   SAVE HANDLER
  // ---------------------------------------
  const handleSave = async () => {
    if (!user) {
      toast.info("Please log in to save");
      return;
    }

    setLesson({ ...lesson, isSaved: !lesson.isSaved });

    const res = await fakeApi.toggleSave({
      lessonId: lesson._id,
      userId: user.uid,
    });

    if (!res.success) {
      toast.error("Failed to update save");
    }
  };

  // ---------------------------------------
  //   REPORT HANDLER
  // ---------------------------------------
  const submitReport = async () => {
    if (!selectedReason) {
      toast.error("Please select a reason");
      return;
    }

    const res = await fakeApi.reportLesson({
      lessonId: lesson._id,
      reporterUserId: user?.uid || "anonymous",
      reason: selectedReason,
      timestamp: new Date(),
    });

    if (res.success) {
      toast.success("Report submitted successfully");
      setReportModal(false);
      setSelectedReason("");
    }
  };

  const handleShare = () => {
    toast.info("Share functionality coming soon!");
  };

  // ---------------------------------------
  //   REUSABLE BUTTON COMPONENT
  // ---------------------------------------
  const Btn = ({ active, onClick, icon, text, activeColor }) => (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition 
        ${active ? `${activeColor} text-white` : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300"}
      `}
    >
      {icon}
      {text}
    </motion.button>
  );

  return (
    <>
      {/* ------------------------------------------------ */}
      {/* BUTTONS SECTION */}
      {/* ------------------------------------------------ */}
      <div className="flex flex-wrap gap-4 mt-4">
        <Btn
          active={lesson?.isLiked}
          activeColor="bg-red-500"
          onClick={handleLike}
          text="Like"
          icon={<FiHeart />}
        />

        <Btn
          active={lesson?.isSaved}
          activeColor="bg-yellow-500"
          onClick={handleSave}
          text="Save"
          icon={<FiBookmark />}
        />

        <Btn
          onClick={() => setReportModal(true)}
          text="Report"
          icon={<FiFlag />}
        />

        <Btn
          activeColor="bg-blue-500"
          onClick={handleShare}
          text="Share"
          icon={<FiShare2 />}
        />
      </div>

      {/* ------------------------------------------------ */}
      {/* REPORT MODAL */}
      {/* ------------------------------------------------ */}
      {reportModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl w-[90%] max-w-md shadow-lg"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold dark:text-white">Report Lesson</h2>
              <button onClick={() => setReportModal(false)}>
                <FiX className="text-xl" />
              </button>
            </div>

            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Select Reason:
            </label>

            <select
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              value={selectedReason}
              onChange={(e) => setSelectedReason(e.target.value)}
            >
              <option value="">-- Choose --</option>
              {reportReasons.map((reason, idx) => (
                <option key={idx} value={reason}>
                  {reason}
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setReportModal(false)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={submitReport}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Submit Report
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default InteractionButtons;
