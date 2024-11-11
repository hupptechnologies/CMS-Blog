import React, { useState } from 'react';
import styles from './section.module.css';

const FirstSection = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className={styles.bg}>
      <div className={styles.container}>
        <h1 className={styles.heroMainTitle}>
          Hello 👋, Welcome to BloggErly! Explore Creative Ideas, Inspiring Stories, and Valuable
          Insights.
        </h1>
        <div className={styles.row}>
          <p className={styles.paragraph}>
            Don’t miss out on fresh updates! Subscribe to our newsletter and be the first to get new
            blog articles, exclusive content, tips, and special offers straight to your inbox. Join the
            BloggErly community today!
          </p>
          <form id="form" action="/submit" method="post" className={styles.form}>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleEmailChange}
              placeholder="Email Address"
              value={email}
              className={styles.emailInput}
              autoComplete="email"
            />
            <button
              type="submit"
              className={styles.emailSubscribe}
              aria-label="subscribe or submit">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FirstSection;
