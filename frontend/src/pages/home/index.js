import React, { useEffect } from 'react';
import MainSectionComponent from '../../component/home/MainSection';
import BlogCardComponent from '../../component/blog/BlogCard';
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
      <MainSectionComponent />
      <BlogCardComponent />
    </>
  );
};

export default HomePage;
