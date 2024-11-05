import React, { useEffect, useState, useCallback } from 'react';
import debounce from 'lodash.debounce';
import { Link } from 'react-router-dom';
import { faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { showErrorNotification } from '../../pages/notification';
import UpdateModalComponent from '../UpdateModalComponent';
import DropdownComponent from '../DropdownComponent';
import PaginationComponent from '../PaginationComponent';
import CreateFormComponent from '../blog/CreateForm';
import DatePickerComponent from '../DatePickerComponent';
import { BlogPostLoading } from '../loading';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlogPosts } from '../../redux/blog/slice';
import { getAllTranslateDetail } from '../../redux/translation/slice';
import { fetchAllBlogsAsync, updateBlogStatusAsync } from '../../redux/blog';
import { getAllUserDetail } from '../../redux/auth/slice';
import { calculateTimePendingPercentage, formattedDate } from '../../utils/common';
import { hasAccess } from '../../utils/common';
import {
  ARCHIVED_SVG,
  DASHBOARD_BLOG_COMMENTS_SVG,
  DASHBOARD_BLOG_LIKE_SVG,
  DASHBOARD_BLOG_VIEWS_SVG,
  DELETE_SVG,
  PUBLISHED_SVG,
  SCHEDULED_SVG
} from '../../assets/icon/svg';

const BlogPostComponent = ({ searchTerm }) => {
  const dispatch = useDispatch();
  const {
    blogPosts,
    blogStatusCounts,
    pagination: { totalPages, totalBlogs },
    totalCount,
    blogLoading
  } = useSelector(getAllBlogPosts);
  const { translations } = useSelector(getAllTranslateDetail);
  const {
    user: { access }
  } = useSelector(getAllUserDetail);
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [showPage, setShowPage] = useState(0);
  const [triggerAPI, setTrigggerAPI] = useState(false);
  const [info, setInfo] = useState({
    color: '',
    type: '',
    id: ''
  });
  const [edit, setEdit] = useState(false);
  const [editDetails, setEditDetails] = useState({});
  const [date, setDate] = useState({});

  const debouncedFetchUsers = useCallback(
    debounce((term, date) => fetchAllBlogs(term, date), 300),
    [selectedOption, currentPage, searchTerm, triggerAPI]
  );

  useEffect(() => {
    debouncedFetchUsers(searchTerm, date);
  }, [dispatch, selectedOption, currentPage, searchTerm, triggerAPI, date]);

  const handleSelectChange = (ctype) => {
    setSelectedOption(ctype);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const fetchAllBlogs = (term, date) => {
    dispatch(
      fetchAllBlogsAsync({
        data: {
          type: selectedOption === 'All' ? '' : selectedOption,
          search: term || '',
          startDate: date?.startDate?.toISOString() || '',
          endDate: date?.endDate?.toISOString() || ''
        },
        page: currentPage,
        limit: 4
      })
    );
  };

  const handleOpen = (data) => {
    setInfo(data);
    setShowModal(true);
  };

  const handleClose = () => {
    setInfo({
      color: '',
      type: '',
      id: ''
    });
    setShowModal(false);
  };

  const handleCallback = (success) => {
    if (success) {
      setSelectedOption('All');
      handleClose();
    }
  };

  const handleSubmit = (type) => {
    dispatch(
      updateBlogStatusAsync({
        data: { status: type, blog_id: info?.id },
        callback: handleCallback
      })
    );
  };

  const showHideCreatePostPage = (count) => {
    setShowPage(count);
    setEditDetails({});
    setTrigggerAPI(!triggerAPI);
    setEdit(false);
  };

  const handleEdit = (blog) => {
    setEditDetails(blog);
    setEdit(true);
    setShowPage(1);
  };

  const handleChangeDate = (cDate) => {
    setDate(cDate);
  };

  const verifyCategoryBlog = (cat) => {
    if (cat.length === 0) {
      showErrorNotification('Please add one category use edit option!');
      return false;
    }
    return true;
  };

  const handleAccess = (actionName) => {
    console.log(hasAccess({ pageNumber: 3, access, actionName }));
    return hasAccess({ pageNumber: 3, access, actionName });
  };

  return (
    <>
      <div className="min-h-28 ">
        <div className="py-4">
          <h2 className="font-bold text-center text-6xl text-slate-700 font-display">
            {edit
              ? 'Edit your blog post'
              : showPage === 0
                ? translations?.blogTitle[0]
                : translations?.blogTitle[1]}
          </h2>
          <p className="text-center mt-4 font-medium text-slate-500 hidden">
            {translations?.breadcrumb?.posts?.ourNewFeed}
          </p>
          <div className={`${showPage === 0 ? '' : 'hidden'}`}>
            <div
              className="justify-between text-gray-900 dark:text-gray-100 flex items-center"
              style={{ gap: '1.5rem' }}
            >
              <div className="flex" style={{ gap: '1rem', alignItems: 'center' }}>
                {handleAccess('add') && (
                  <div
                    onClick={() => setShowPage(1)}
                    data-tooltip-id="createPost-tooltip"
                    className="cursor-pointer"
                  >
                    <FontAwesomeIcon icon={faPlus} color="green" style={{ height: '1rem' }} />
                  </div>
                )}
                {handleAccess('date') && (
                  <DatePickerComponent handleChangeDate={handleChangeDate} />
                )}
              </div>
              {handleAccess('select') && (
                <DropdownComponent
                  data={blogStatusCounts}
                  handleSelectChange={handleSelectChange}
                  total={totalCount}
                  selectedOption={selectedOption}
                />
              )}
            </div>
            {blogLoading ? (
              <BlogPostLoading />
            ) : (
              <div className='grid grid-cols-4 gap-4 gap-6 mt-12'>
                {blogPosts.length > 0 &&
                  blogPosts.map((blog, index) => (
                    <div key={index} className="bg-white shadow rounded-lg overflow-hidden">
                      {blog?.BlogManage?.status === 'scheduled' && (
                        <div className="flex-start flex h-2.5 w-full overflow-hidden bg-gray-200 font-sans text-xs font-medium">
                          <div
                            style={{
                              fontSize: '8px',
                              width: `${calculateTimePendingPercentage(blog?.updated_at)}%`
                            }}
                            className="flex items-center justify-center overflow-hidden bg-gray-700 text-white"
                          >
                            {`${calculateTimePendingPercentage(blog?.updated_at)}% Completed`}
                          </div>
                        </div>
                      )}
                      <img src={blog.img} className="object-cover h-52 w-full" alt="" />
                      <div className="p-6">
                        <span className="block text-slate-400 font-semibold text-sm">
                          {formattedDate(blog.created_at)}
                        </span>
                        <h3 className="mt-3 font-bold text-lg pb-4 border-b border-slate-300">
                          <Link>{blog.title}</Link>
                        </h3>
                        <div className="flex mt-4 gap-4 items-center">
                          <span className="flex gap-1 items-center text-sm">
                            {DASHBOARD_BLOG_VIEWS_SVG}
                            {blog.views}
                          </span>
                          <span className="flex gap-1 items-center text-sm">
                            {DASHBOARD_BLOG_LIKE_SVG}
                            {blog.likes}
                          </span>
                          <span className="flex gap-1 items-center text-sm">
                            {DASHBOARD_BLOG_COMMENTS_SVG}
                            {blog.comments}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-4 p-3">
                        {selectedOption !== translations?.modal?.deleted &&
                          handleAccess('delete') && (
                            <button
                              data-tooltip-id="delete-tooltip"
                              onClick={() => {
                                if (verifyCategoryBlog(blog.categories)) {
                                  handleOpen({
                                    color: 'red-700',
                                    id: blog.id,
                                    type: translations?.modal?.deleted
                                  });
                                }
                              }}
                              style={{ margin: 0, padding: 0 }}
                              type="button"
                            >
                              {DELETE_SVG}
                            </button>
                          )}
                        {selectedOption !== translations?.modal?.archived &&
                          handleAccess('archive') && (
                            <button
                              data-tooltip-id="achive-tooltip"
                              onClick={() => {
                                if (verifyCategoryBlog(blog.categories)) {
                                  handleOpen({
                                    color: 'green-700',
                                    id: blog.id,
                                    type: translations?.modal?.archived
                                  });
                                }
                              }}
                              type="button"
                              style={{ margin: 0, padding: 0 }}
                            >
                              {ARCHIVED_SVG}
                            </button>
                          )}
                        {selectedOption !== translations?.modal?.published &&
                          selectedOption !== 'All' &&
                          handleAccess('publish') && (
                            <button
                              data-tooltip-id="publish-tooltip"
                              onClick={() => {
                                if (verifyCategoryBlog(blog.categories)) {
                                  handleOpen({
                                    color: 'cyan-700',
                                    id: blog.id,
                                    type: translations?.modal?.published
                                  });
                                }
                              }}
                              type="button"
                              style={{ margin: 0, padding: 0 }}
                            >
                              {PUBLISHED_SVG}
                            </button>
                          )}
                        {selectedOption !== translations?.modal?.scheduled &&
                          handleAccess('schedule') && (
                            <button
                              data-tooltip-id="schedule-tooltip"
                              onClick={() => {
                                if (verifyCategoryBlog(blog.categories)) {
                                  handleOpen({
                                    color: 'purple-700',
                                    id: blog.id,
                                    type: translations?.modal?.scheduled
                                  });
                                }
                              }}
                              type="button"
                              style={{ margin: 0, padding: 0 }}
                            >
                              {SCHEDULED_SVG}
                            </button>
                          )}
                        {handleAccess('edit') && (
                          <button data-tooltip-id="edit-tooltip" onClick={() => handleEdit(blog)}>
                            <FontAwesomeIcon icon={faPenToSquare} color="green" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            )}
            {handleAccess('pagination') && (
              <PaginationComponent
                translations={translations}
                total={totalBlogs}
                totalPages={totalPages}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
              />
            )}
          </div>
        </div>
        {showPage === 1 && (
          <CreateFormComponent
            edit={edit}
            setEdit={setEdit}
            editDetails={editDetails}
            setEditDetails={setEditDetails}
            handleBack={showHideCreatePostPage}
          />
        )}
        <UpdateModalComponent
          showModal={showModal}
          handleClose={handleClose}
          title={`${translations?.modal?.modalTitle} ${info.type}`}
          content={translations?.modal?.modalContent}
          hightlightText={info.id}
          info={info}
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

export default BlogPostComponent;
