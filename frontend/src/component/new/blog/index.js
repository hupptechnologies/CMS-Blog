import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import LikeButtonComponent from '../../LikeButtonComponent';
import { formattedDate } from '../../../utils/common';
import styles from './blog.module.css';

const BlogPostCard = ({ handleCallback, item, user, returnCategoriesName }) => {
  return (
    <>
      {Object.entries(item).length > 0 && (
        <div className={`${styles.card} card`} key={item.id}>
          <Card.Img
            variant="top"
            src={item.img}
            className={styles.cardImage}
            loading="lazy"
            alt={item.title}
          />
          <Card.Body className={styles.cardBody}>
            {item.categories.length > 0 &&
              item.categories.map((cat, index) => (
                <Card.Text className={styles.cardCategory} key={index}>
                  {returnCategoriesName(cat)}
                </Card.Text>
              ))}
            <Link to={`/blog/${item.id}`}>
              <Card.Title className={styles.cardTitle}>{item.title}</Card.Title>
            </Link>
            <Card.Text className={styles.cardDescription}>
              <div dangerouslySetInnerHTML={{ __html: item.content.slice(0, 150) }} />
            </Card.Text>
            <div style={{ gap: '150px', display: 'flex', justifyContent: 'space-between' }}>
              <div className={styles.cardInfo}>
                <Card.Img
                  className={styles.authorImage}
                  src={'https://shorturl.at/lCDKU'}
                  alt={''}
                  loading="lazy"
                />
                <div className={styles.cardTime}>
                  <FontAwesomeIcon className={styles.cardClock} icon={faClock} />
                  <Card.Text className={styles.readingTime}>
                    {formattedDate(item.created_at)}
                  </Card.Text>
                </div>
              </div>
              <LikeButtonComponent
                className="like"
                data={{
                  blog_id: item.id,
                  user_id: user.id,
                  callback: handleCallback
                }}
              />
            </div>
            <div className="flex flex-wrap pt-2">
              {item.tags.map((tag, index) => (
                <span
                  key={index}
                  className="mr-2 mb-2 px-2 py-1 bg-gray-200 rounded-full text-xs dark:text-gray-800">
                  {tag}
                </span>
              ))}
            </div>
          </Card.Body>
        </div>
      )}
    </>
  );
};

export default BlogPostCard;
