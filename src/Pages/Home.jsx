import React from "react";
import MyCarousel from "../Components/Home/MyCarousel";
import WhyLearningSection from "../Components/Home/WhyLearningSection";
import LessonGrid from "../Components/Home/LessonGrid";
import Wraper from "../Components/Wraper";
import TopContributors from "../Components/Home/TopContributors";
import MostSavedLessons from "../Components/Home/MostSavedLessons";

const Home = () => {
  return (
    <main className="">
      {/* Hero Carousel */}
      <section>
        <MyCarousel />
      </section>

      {/* Featured Lessons */}
      <section className="mt-16">
        <Wraper>
          <LessonGrid />
        </Wraper>
      </section>
      

      {/* Why Learning From Life Matters */}
      <section className="mt-20 bg-gray-100 dark:bg-gray-900">
        <Wraper>
          <WhyLearningSection />
        </Wraper>
      </section>
      
      {/* Top Contributors */}
      <section className="mt-16">
        <Wraper>
          <TopContributors />
        </Wraper>
      </section>

       {/* Why Learning From Life Matters */}
      <section className="mt-20 bg-gray-100 dark:bg-gray-900">
        <Wraper>
          <MostSavedLessons />
        </Wraper>
      </section>
    </main>
  );
};

export default Home;
