import React from 'react';
import { Link } from 'react-router-dom';
import { styles } from '../../styles';

const MainSectionComponent = () => {
  const trackEvent = (action, category, label) => {
    if (window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label
      });
    }
  };
  return (
    <>
      <main>
        <section>
          <div className={`px-4 py-6 bg-${styles.main}-100 space-y-6 sm:space-y-0`}>
            <div className={`col-span-4 bg-${styles.main}-400 rounded-md flex items-center h-96`}>
              <div className="ml-20 w-full">
                <h2 className={`text-${styles.primary} text-4xl`}>Welcome to Our Blog</h2>
                <p
                  className={`text-${styles.main}-300 mt-4 capitalize font-thin tracking-wider leading-7`}
                >
                  Explore insightful articles, thought-provoking analyses, and practical guides on a
                  variety of topics. Whether you&apos;re a seasoned professional or a curious enthusiast,
                  our blog is your gateway to understanding the latest trends and innovations.
                </p>
                <Link
                  onClick={() => trackEvent('click', 'Button', 'My Button')}
                  className={`uppercase inline-block mt-8 text-sm bg-${styles.primary} py-2 px-4 rounded font-semibold hover:bg-${styles.main}-200 hover:text-${styles.main}-800`}
                >
                  Start Reading
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default MainSectionComponent;
