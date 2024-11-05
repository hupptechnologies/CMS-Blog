import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { Image } from 'cloudinary-react';
import RichTextEditor from '../draft/Draft';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlogPosts } from '../../redux/blog/slice';
import { fetchCategoriesAsync } from '../../redux/category';
import { getAllCategoriesDetail } from '../../redux/category/slice';
import { getAllTranslateDetail } from '../../redux/translation/slice';
import {
  uploadPresetForBlogAsync,
  createBlogPostAsync,
  updateBlogPostAsync
} from '../../redux/blog';
import { ConfigCloudnary } from '../../utils/configs';
import { styles } from '../../styles';

const CreateFormComponent = ({ handleBack, edit, editDetails, setEditDetails, setEdit }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { imageObj } = useSelector(getAllBlogPosts);
  const { categories } = useSelector(getAllCategoriesDetail);
  const { translations } = useSelector(getAllTranslateDetail);
  const [title, setTitle] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const [error, setError] = useState(null);
  const [selectedState, setSelectedState] = useState('draft');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');

  const categoryOptions = categories?.map((category) => {
    return { value: category?.id, label: category?.name };
  });

  useEffect(() => {
    dispatch(
      fetchCategoriesAsync({
        page: 1,
        limit: 50,
        data: { type: 'active' }
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (edit && Object.entries(editDetails)?.length > 0) {
      const {
        title: blogTitle,
        BlogManage: { status },
        categories: editCat
      } = editDetails;
      setTitle(blogTitle);
      setSelectedState(status);
      setSelectedCategories(editCat.map(Number));
    }
  }, [edit, editDetails]);

  const handleEditorContentChange = (content) => {
    setEditorContent(content);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('upload_preset', ConfigCloudnary?.preset);
    dispatch(uploadPresetForBlogAsync({ data: formData }));
  };

  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions.map((option) => option.value));
  };

  const handleFormSubmit = async(event) => {
    event.preventDefault();
    try {
      const Obj = {
        title,
        content: editorContent,
        img: imageObj?.secure_url,
        categories: selectedCategories,
        tags: ['Europe']
      };
      if (edit) {
        Obj.blog_id = editDetails?.id;
        Obj.status = selectedState;
        delete Obj.content;
        dispatch(
          updateBlogPostAsync({ data: Obj, status: selectedState, callback: handleCallback })
        );
      } else {
        dispatch(
          createBlogPostAsync({ data: Obj, status: selectedState, callback: handleCallback })
        );
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setError('Failed to upload image. Please try again.');
    }
  };

  const handleCallback = (success) => {
    if (success) {
      setTitle('');
      setEditorContent('');
      setError(null);
      setEditDetails({});
      setEdit(false);
      handleBack(0);
      navigate('/dashboard');
    }
  };

  return (
    <div className="flex justify-center max-w-7xl">
      <form className={'w-full p-4 rounded shadow-md bg-gray-900'} onSubmit={handleFormSubmit}>
        <h2 className={`text-xl mb-4 tracking-wider font-lighter text-${styles.primary}`}>
          {edit ? 'Edit your blog' : translations?.breadcrumb?.posts?.createNewBlog}
        </h2>
        <p className={`text-${styles.primary} mb-4 ${edit ? 'hidden' : ''}`}>
          {translations?.breadcrumb?.posts?.para}
        </p>
        <div className="mb-4">
          <input
            type="text"
            id="title"
            name="title"
            className={`w-full px-3 py-2 bg-${styles.main} text-black rounded-sm border border-gray-600 focus:outline-none`}
            placeholder="title*"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-white dark:text-white">
            {translations?.breadcrumb?.posts?.selectState}
          </label>
          <select
            onChange={(e) => setSelectedState(e.target.value)}
            value={selectedState}
            className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>{translations?.breadcrumb?.posts?.chooseState}</option>
            <option value="published">Published</option>
            <option value="scheduled">Scheduled</option>
            <option value="draft">Draft</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-white dark:text-white">
            {translations?.breadcrumb?.posts?.selectCategories}
          </label>
          {categoryOptions && (
            <Select
              id="categories"
              name="categories"
              isMulti
              options={categoryOptions}
              value={categoryOptions.filter((option) => selectedCategories.includes(option.value))}
              onChange={handleCategoryChange}
              closeMenuOnSelect={false}
            />
          )}
        </div>
        <div className="mb-4 hidden">
          <label className="block mb-2 text-sm font-medium text-white dark:text-white">
            {translations?.breadcrumb?.posts?.selectTags}
          </label>
          <select
            onChange={(e) => setSelectedTag(e.target.value)}
            value={selectedTag}
            className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Choose a tags</option>
            <option value="published">Published</option>
            <option value="scheduled">Scheduled</option>
            <option value="draft">Draft</option>
          </select>
        </div>
        <div className={`${edit ? 'hidden' : ''} mb-4`}>
          <label className="block mb-2 text-sm font-medium text-white dark:text-white">
            {translations?.breadcrumb?.posts?.describe}
          </label>
          <RichTextEditor
            initialContent={editorContent}
            name="content"
            onContentChange={handleEditorContentChange}
          />
        </div>
        <div className="mb-4">
          <label
            className={'w-64 flex flex-col items-center px-4 py-6 bg-white text-black rounded-lg shadow-lg tracking-wide uppercase border border-gray-500 hover:bg-gray-100 cursor-pointer'}
          >
            <svg
              className="w-8 h-8"
              fill="#000000"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
            </svg>
            <span className="mt-2 text-base leading-normal">
              {translations?.common?.selectFile}
            </span>
            <input type="file" className="hidden" onChange={handleFileChange} />
          </label>
        </div>
        {imageObj?.secure_url && (
          <div className="mb-4">
            <Image
              cloudName={ConfigCloudnary.cloudName}
              publicId={imageObj?.secure_url}
              width="300"
            />
          </div>
        )}
        {!imageObj?.secure_url && editDetails && (
          <div className="mb-4">
            <Image cloudName={ConfigCloudnary.cloudName} publicId={editDetails?.img} width="300" />
          </div>
        )}
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <div className="flex justify-between">
          <button
            onClick={() => handleBack(0)}
            className={'py-4 px-6 bg-white text-gray-900 rounded-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-100'}
          >
            &#9664; {translations?.common?.back}
          </button>
          <button
            className={'py-4 px-6 bg-white text-gray-900 rounded-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-100'}
          >
            {edit ? 'Update Post Blog →' : 'Post Blog →'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateFormComponent;
