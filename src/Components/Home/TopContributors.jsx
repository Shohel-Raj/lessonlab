import React from "react";

// Fake contributors data
const fakeContributors = [
  {
    name: "Ariana Gomez",
    photoURL: "https://i.pravatar.cc/150?img=47",
    totalLessons: 12,
  },
  {
    name: "John Doe",
    photoURL: "https://i.pravatar.cc/150?img=32",
    totalLessons: 9,
  },
  {
    name: "Sophia Lee",
    photoURL: "https://i.pravatar.cc/150?img=12",
    totalLessons: 7,
  },
  {
    name: "Michael Brown",
    photoURL: "https://i.pravatar.cc/150?img=52",
    totalLessons: 6,
  },
];

const TopContributors = ({ contributors = fakeContributors }) => {
  return (
    <section >
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">
          Top Contributors of the Week
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          Recognizing the most active members who are sharing meaningful lessons and inspiring growth in our community.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {contributors.map((user, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={user.photoURL}
                alt={user.name}
                className="w-20 h-20 rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-semibold mb-1 dark:text-white">{user.name}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {user.totalLessons} Lessons Created
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopContributors;
