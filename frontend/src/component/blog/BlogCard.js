import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import LikeButtonComponent from '../LikeButtonComponent';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlogPosts } from '../../redux/blog/slice';
import { getAllUserDetail } from '../../redux/auth/slice';
import { fetchAllBlogsAsync } from '../../redux/blog';
import { getAllCategoriesDetail } from '../../redux/category/slice';
import { formatViews, formattedDate } from '../../utils/common';
import { styles } from '../../styles';

const BlogCardComponent = () => {
  const dispatch = useDispatch();
  const { blogPosts } = useSelector(getAllBlogPosts);
  const { categories } = useSelector(getAllCategoriesDetail);
  const { user } = useSelector(getAllUserDetail);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const categoryOptions = categories?.map((category) => {
    return { value: category?.id, label: category?.name };
  });

  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions.map((option) => option.value));
  };

  const isBlogMatchedCategories = (blogCategories) => {
    if (selectedCategories.length === 0) return true;
    return selectedCategories.map(String).some((cat) => blogCategories.includes(cat));
  };

  const handleCallback = (response) => {
    if (response.success) {
      dispatch(
        fetchAllBlogsAsync({
          data: { type: 'published' },
          page: 1,
          limit: 10
        })
      );
    }
  };

  const returnCategoriesName = (id) => {
    return categories?.length > 0 && categories.filter((cat) => String(cat.id) === id)[0]?.name;
  };

  return (
    <>
      <section className={`py-6 sm:py-12 dark:bg-${styles.main} dark:text-${styles.primary}`}>
        <div className="container p-6 mx-auto space-y-8">
          <div className="space-y-2 text-center">
            <h2 className={`text-3xl font-bold text-${styles.secondary}`}>
              Experience Has Taught Well.
            </h2>
            <p className={`font-serif text-sm dark:text-${styles.primary}`}>
              Experience is the best teacher. But sometimes, the tuition is just too high. Smart
              people learn from other&apos;s mistakes. They also learn from other&apos;s success.
            </p>
            <p className={`font-serif text-sm dark:text-${styles.primary}`}>
              These titles speak to the problems your target personas are facing and promise to
              deliver insight on how to deal with these problems.
            </p>
          </div>
          <div className="mb-4" style={{ width: '20%' }}>
            <label
              htmlFor="categories"
              className={`block text-sm font-medium text-${styles.secondary}`}
            >
              Filter by Category:
            </label>
            {categoryOptions && (
              <Select
                id="categories"
                name="categories"
                isMulti
                options={categoryOptions}
                value={categoryOptions.filter((option) =>
                  selectedCategories.includes(option.value)
                )}
                onChange={handleCategoryChange}
                closeMenuOnSelect={false}
              />
            )}
          </div>
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
            {blogPosts?.length > 0 &&
              blogPosts.map(
                (item) =>
                  isBlogMatchedCategories(item.categories) && (
                    <article key={item.id} className={`flex flex-col p-2 bg-${styles.main}`}>
                      <Link to={`/blog/${item.id}`} aria-label={item.title}>
                        <img
                          alt=""
                          className="object-cover w-full cursor-pointer h-52 dark:bg-gray-500"
                          src={item.img}
                        />
                      </Link>
                      <LikeButtonComponent
                        className="like"
                        data={{
                          blog_id: item.id,
                          user_id: user.id,
                          callback: handleCallback
                        }}
                      />
                      <div className="flex flex-col flex-1 p-6">
                        <div className="flex flex-wrap justify-between pb-2">
                          {item.categories.length > 0 &&
                            item.categories.map((cat, index) => (
                              <Link
                                key={index}
                                to=""
                                className={`text-xs tracking-wider uppercase hover:underline dark:text-${styles.secondary}`}
                              >
                                <span>{returnCategoriesName(cat)}</span>
                              </Link>
                            ))}
                        </div>
                        <h3 className="flex-1 py-2 text-lg font-semibold leading-snug text-black dark:text-white">
                          {item.title}
                        </h3>
                        <div className="flex justify-between text-xs dark:text-gray-600">
                          <span>{formattedDate(item.date)}</span>
                          <span>{formatViews(item.views)}</span>
                        </div>
                        <div className="flex flex-wrap pt-2">
                          {item.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="mr-2 mb-2 px-2 py-1 bg-gray-200 rounded-full text-xs dark:text-gray-800"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </article>
                  )
              )}
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogCardComponent;
