import React from 'react';
import Wraper from './Wraper';

const Footer = () => {
    return (
        <footer className="bg-base-200 mt-8">
        <Wraper>
          <div className="py-4 text-center text-gray-600 dark:text-gray-300">
            &copy; {new Date().getFullYear()} Digital Life Lessons. All rights reserved.
          </div>
        </Wraper>
      </footer>
    );
};

export default Footer;