import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdvancedCommentComponent from '../comment/CommentSectionComponent';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlogPosts } from '../../redux/blog/slice';
import {
  createCommentAsync,
  fetchAllBlogsAsync,
  getAllCommentsAsync,
  viewCurrentBlogAsync
} from '../../redux/blog';
import { getAllUserDetail } from '../../redux/auth/slice';
import { formattedDate } from '../../utils/common';

const BlogPostComponent = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { blogPosts, comments, commentLoading } = useSelector(getAllBlogPosts);
  const { user } = useSelector(getAllUserDetail);

  const post = blogPosts.find((blog) => blog.id === parseInt(id));

  useEffect(() => {
    dispatch(getAllCommentsAsync({ blogId: id }));
  }, [dispatch, id]);

  useEffect(() => {
    if (post) {
      dispatch(viewCurrentBlogAsync({ blog_id: post.id, user_id: user.id }));
    } else {
      dispatch(fetchAllBlogsAsync({ data: { type: '' }}));
    }
  }, [dispatch, post, user]);

  const handleCreateComment = (values) => {
    dispatch(
      createCommentAsync({
        data: { blog_id: id, author_id: user?.id, status: 'delivered', content: values?.message },
        callback: handleCallback
      })
    );
  };

  const handleCreateReplie = (values) => {
    dispatch(createCommentAsync({ data: values, callback: handleCallback }));
  };

  const handleCallback = (success) => {
    if (success) {
      dispatch(getAllCommentsAsync({ blogId: id }));
    }
  };

  return (
    <>
      <div className="flex items-center p-4 main-blog-section">
        {post && (
          <div
            className="mt-6"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 2fr)',
              gap: '5rem',
              marginRight: '10rem',
              marginLeft: '10rem'
            }}
          >
            <div>
              <img src={post.img} alt={post.title} className="mb-4 rounded-lg shadow-lg w-full" />
              {!commentLoading && (
                <AdvancedCommentComponent
                  comments={comments}
                  user={user}
                  handleCreateComment={handleCreateComment}
                  handleCreateReplie={handleCreateReplie}
                />
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
              <p className="text-gray-600 mb-4">{formattedDate(post.created_at)}</p>
              <div
                className="text-gray-700 leading-relaxed mb-6"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    src="https://via.placeholder.com/150"
                    alt="Author"
                    className="rounded-full h-10 w-10"
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Written by {post.author}</p>
                  <p className="text-sm text-gray-500">Published in {post.categories.join(', ')}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BlogPostComponent;
