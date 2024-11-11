import React, { useState } from 'react';
import Select from 'react-select';
import { Card, Container } from 'react-bootstrap';
import BlogPostCard from '../new/blog';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlogPosts } from '../../redux/blog/slice';
import { getAllUserDetail } from '../../redux/auth/slice';
import { fetchAllBlogsAsync } from '../../redux/blog';
import { getAllCategoriesDetail } from '../../redux/category/slice';
import stylesBlog from '../new/blog/blog.module.css';

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
      <div className={stylesBlog.bg} id="articles">
        <div style={{ display: 'flex', maxWidth: '1320px', margin: 'auto' }}>
          <Card.Body className={stylesBlog.cardBody}>
            <h2 className={stylesBlog.cardTitle}>Experience Has Taught Well.</h2>
            <Card.Text className={stylesBlog.cardDescription}>
              Experience is the best teacher. But sometimes, the tuition is just too high. Smart
              people learn from other&apos;s mistakes. They also learn from other&apos;s success.
              These titles speak to the problems your target personas are facing and promise to
              deliver insight on how to deal with these problems.
            </Card.Text>
          </Card.Body>
          <div className="mb-4" style={{ width: '100%' }}>
            <label
              htmlFor="categories"
              className={stylesBlog.cardTitle}>
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
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4"></div>
        </div>
        <Container
          className={`${stylesBlog.container} ${
            blogPosts.length === 0 ? stylesBlog.centeredContainer : ''
          }`}>
          {blogPosts?.length > 0 &&
            blogPosts.map(
              (item, index) =>
                isBlogMatchedCategories(item.categories) && (
                  <BlogPostCard
                    handleCallback={handleCallback}
                    user={user}
                    item={item}
                    key={index}
                    returnCategoriesName={returnCategoriesName}
                  />
                )
            )}
        </Container>
      </div>
    </>
  );
};

export default BlogCardComponent;
