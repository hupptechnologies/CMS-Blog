import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight, faArrowRight, faTag } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { getAllCategoriesDetail } from '../../../redux/category/slice';
import styles from './Category.module.css';

const TopCategory = () => {
  const { categories } = useSelector(getAllCategoriesDetail);

  return (
    <div className={styles.bg} id="tags">
      <div className={styles.container}>
        <div className={styles.pTags}>
          <FontAwesomeIcon icon={faTag} className={styles.pTagsIcon} />
          <h1 className={styles.pTagsTitle}>Popular Categories</h1>
        </div>
        {categories != null &&
          categories.length > 0 &&
          categories.map((category, index) => (
            <div key={index} className={styles.card}>
              <img src={'https://quirvibe.vercel.app/assets/Technology-ABmopdN_.webp'} alt="image.." className={styles.cardImage} loading="lazy" />
              <Link className={styles.cardInfo}>
                <h2 className={styles.cardTitle}>{category.name}</h2>
                <span className={styles.cardCount}>2 posts</span>
              </Link>
              <Link className={styles.cardIcon} aria-label={`Viw ${category.name} posts`}>
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </div>
          ))}
        <Link className={`${styles.pTags} ${styles.viewAll}`} aria-label="View All Tags">
          <FontAwesomeIcon icon={faAnglesRight} className={styles.pTagsIcon} />
          <h1 className={styles.pTagsTitle}>View All</h1>
        </Link>
      </div>
    </div>
  );
};

export default TopCategory;
