import React, { useEffect } from 'react';
import FirstSection from '../../component/new/section';
import BlogCardComponent from '../../component/blog/BlogCard';
import FeaturedArticles from '../../component/new/articles';
import TopCategory from '../../component/new/category';
import { useDispatch } from 'react-redux';
import { fetchAllBlogsAsync } from '../../redux/blog';
import { fetchCategoriesAsync } from '../../redux/category';

const HomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fetchAllBlogsAsync({
        data: { type: 'published' },
        page: 1,
        limit: 10
      })
    );
    dispatch(
      fetchCategoriesAsync({
        data: { type: '' },
        page: 1,
        limit: 50
      })
    );
  }, [dispatch]);
  return (
    <>
      <FirstSection />
      <FeaturedArticles />
      <TopCategory />
      <BlogCardComponent />
    </>
  );
};

export default HomePage;
