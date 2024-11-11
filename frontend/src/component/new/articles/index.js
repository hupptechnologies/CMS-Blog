import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Articles.module.css';

const FeaturedArticles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async() => {
      try {
        const response = await fetch('https://api.npoint.io/df1918b475de71952ad7');
        const articles = await response.json();
        setArticles(articles);
      } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
      }
    };
    fetchArticles();
  }, []);

  return (
    <div className={styles.bg} id="featured">
      <div className={styles.container}>
        {articles && articles.length > 0 && (
          <div className={styles.cards}>
            {articles.slice(8, 11).map((article, index) => (
              <Link key={index} className={styles.card}>
                <img loading="lazy" src={article.image} alt="Card image" className={styles.image} />
                <div className={styles.overlay}>
                  <span className={styles.category}>{article.category}</span>
                  <h1 className={styles.title}>{article.title.slice(0, 30)}...</h1>
                  <div className={styles.info}>
                    <img
                      src={article.author_image}
                      alt="Card image"
                      className={styles.authorImage}
                    />
                    <p className={styles.readingTime}>{article.reading_time}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedArticles;
