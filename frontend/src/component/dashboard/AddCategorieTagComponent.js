import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { showWarningNotification } from '../../pages/notification';
import DropdownComponent from '../DropdownComponent';
import PaginationComponent from '../PaginationComponent';
import UpdateModalComponent from '../UpdateModalComponent';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategoriesDetail } from '../../redux/category/slice';
import { getAllTranslateDetail } from '../../redux/translation/slice';
import {
  createCategoryAsync,
  deleteCategoryAsync,
  fetchCategoriesAsync
} from '../../redux/category/index';
import { getAllUserDetail } from '../../redux/auth/slice';
import { hasAccess } from '../../utils/common';
import { DELETE_SVG } from '../../assets/icon/svg';

const AddCategorieTagComponent = ({ searchTerm }) => {
  const dispatch = useDispatch();
  const {
    categories,
    pagination: { totalPages, totalCategories },
    categoriesStatus,
    total
  } = useSelector(getAllCategoriesDetail);
  const { translations } = useSelector(getAllTranslateDetail);
  const {
    user: { access }
  } = useSelector(getAllUserDetail);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOption, setSelectedOption] = useState('All');
  const [catName, setCatName] = useState('');
  const [description, setDescription] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [info, setInfo] = useState({
    color: '',
    type: '',
    id: ''
  });

  const debouncedFetchUsers = useCallback(
    debounce((term) => handleCallAPI(term), 300),
    []
  );

  useEffect(() => {
    debouncedFetchUsers(searchTerm);
  }, [dispatch, currentPage, selectedOption, searchTerm]);

  const handleCallAPI = (term) => {
    dispatch(
      fetchCategoriesAsync({
        page: currentPage,
        limit: 10,
        data: {
          type: selectedOption === 'All' ? '' : selectedOption,
          search: term || ''
        }
      })
    );
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleSelectChange = (ctype) => {
    setSelectedOption(ctype);
    setCurrentPage(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createCategoryAsync({
        data: { catName, description },
        callback: handleCallback
      })
    );
  };

  const handleCallback = (success) => {
    if (success) {
      setShowModal(false);
      setCurrentPage(1);
      setSelectedOption('All');
      setCatName('');
      setDescription('');
      setInfo({
        color: '',
        type: '',
        id: ''
      });
      handleCallAPI();
    }
  };

  const handleClose = () => {
    setInfo({
      color: '',
      type: '',
      id: ''
    });
    setShowModal(false);
  };

  const handleOpen = (data) => {
    setInfo(data);
    setShowModal(true);
  };

  const handleConfirm = () => {
    dispatch(deleteCategoryAsync({ catId: info.id, callback: handleCallback }));
  };

  const handleEdit = (cat) => {
    if (cat.name === catName) {
      setCatName('');
      setDescription('');
      setInfo({
        color: '',
        type: '',
        id: ''
      });
    } else {
      setCatName(cat.name);
      setDescription(cat.description);
      setInfo({
        color: '',
        type: 'edit',
        id: cat.id
      });
    }
  };

  const handleAccess = (actionName) => {
    return hasAccess({ pageNumber: 6, access, actionName });
  };

  return (
    <div className="bg-gray-100">
      <div className="header my-3 h-12 px-10 flex items-center justify-between">
        <h1 className="font-medium text-2xl">
          {translations?.common?.all} {translations?.common?.categories}
        </h1>
        {handleAccess('select') && (
          <DropdownComponent
            data={categoriesStatus}
            selectedOption={selectedOption}
            handleSelectChange={handleSelectChange}
            total={total}
          />
        )}
      </div>
      <div className="flex flex-col mx-3 mt-6 lg:flex-row">
        {handleAccess('add') && (
          <div className="w-full lg:w-1/3 m-1">
            <form className="w-full bg-white shadow-md p-6" onSubmit={handleSubmit}>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-full px-3 mb-6">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="category_name"
                  >
                    {translations?.table?.category} {translations?.table?.name}
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-gray-800"
                    type="text"
                    name="name"
                    placeholder="Category Name"
                    required
                    value={catName}
                    onChange={(e) => setCatName(e.target.value)}
                  />
                </div>
                <div className="w-full px-3 mb-6">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="description"
                  >
                    {translations?.table?.description}
                  </label>
                  <textarea
                    rows="4"
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-gray-800"
                    type="text"
                    name="description"
                    placeholder="Type here"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="w-full md:w-full px-3 mb-6">
                  {info.type === 'edit' ? (
                    <button className="appearance-none block w-full bg-gray-900 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-gray-900">
                      update {translations?.table?.category}
                    </button>
                  ) : (
                    <button className="appearance-none block w-full bg-gray-900 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-gray-900">
                      {translations?.form?.add} {translations?.table?.category}
                    </button>
                  )}
                </div>

                <div
                  className="w-full px-3 mb-8"
                  onClick={() =>
                    showWarningNotification('Currently You cannot upload category image!')
                  }
                >
                  <label
                    className="mx-auto cursor-pointer flex w-full max-w-lg flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-400 bg-white p-6 text-center"
                    htmlFor="dropzone-file"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-gray-800"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>

                    <h2 className="mt-4 text-xl font-medium text-gray-700 tracking-wide">
                      {translations?.table?.category} {translations?.form?.image}
                    </h2>

                    <p className="mt-2 text-gray-500 tracking-wide">
                      {translations?.common?.filePara}
                    </p>

                    <input
                      type="file"
                      className="hidden"
                      name="category_image"
                      accept="image/png, image/jpeg, image/webp"
                    />
                  </label>
                </div>
              </div>
            </form>
          </div>
        )}
        <div
          className="w-full lg:w-2/3 m-1 bg-white shadow-lg text-lg rounded-sm border border-gray-200"
          style={{ height: 'fit-content' }}
        >
          <div className="overflow-x-auto rounded-lg p-3">
            <table className="table-auto w-full">
              <thead className="text-sm font-semibold uppercase text-gray-800 bg-gray-50 mx-auto">
                <tr>
                  <th></th>
                  <th>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-current w-5 h-5 mx-auto"
                    >
                      <path d="M6 22h12a2 2 0 0 0 2-2V8l-6-6H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2zm7-18 5 5h-5V4zm-4.5 7a1.5 1.5 0 1 1-.001 3.001A1.5 1.5 0 0 1 8.5 11zm.5 5 1.597 1.363L13 13l4 6H7l2-3z"></path>
                    </svg>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold">{translations?.table?.category}</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-left">
                      {translations?.table?.description}
                    </div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-left">{translations?.table?.status}</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-center">{translations?.table?.action}</div>
                  </th>
                </tr>
                {categories?.length > 0 &&
                  categories.map((cat, index) => (
                    <tr key={index}>
                      <td>{cat.id}</td>
                      <td>
                        <img
                          alt=""
                          src="https://images.pexels.com/photos/25652584/pexels-photo-25652584/free-photo-of-elegant-man-wearing-navy-suit.jpeg?auto=compress&cs=tinysrgb&w=400"
                          className="h-8 w-8 mx-auto"
                        />
                      </td>
                      <td style={{ textAlign: 'center' }}>{cat.name}</td>
                      <td>{cat.description ? cat.description : 'Sample Description'}</td>
                      <td>{cat.status}</td>
                      <td className="p-2">
                        <div className="flex justify-center">
                          {handleAccess('edit') && (
                            <Link
                              onClick={() => handleEdit(cat)}
                              data-tooltip-id="edit-tooltip"
                              className={`rounded-md ${cat.name === catName ? 'bg-gray-100' : 'hover:bg-gray-100'} text-gray-600 p-2 flex justify-between items-center`}
                            >
                              {translations?.table?.edit}
                            </Link>
                          )}
                          {handleAccess('delete') && (
                            <button
                              data-tooltip-id="delete-tooltip"
                              onClick={() =>
                                handleOpen({
                                  color: 'red-700',
                                  id: cat.id,
                                  type: translations?.modal?.deleted
                                })
                              }
                              className="rounded-md hover:bg-red-100 text-red-600 p-2 flex justify-between items-center"
                            >
                              {DELETE_SVG}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
              </thead>
            </table>
            {handleAccess('pagination') && (
              <PaginationComponent
                translations={translations}
                handlePageChange={handlePageChange}
                total={totalCategories}
                totalPages={totalPages}
                currentPage={currentPage}
              />
            )}
          </div>
        </div>
      </div>
      <UpdateModalComponent
        showModal={showModal}
        handleClose={handleClose}
        title={`${translations?.modal?.modalTitle} ${info.type}`}
        content={translations?.modal?.modalContent}
        hightlightText={info.id}
        info={info}
        handleSubmit={handleConfirm}
      />
    </div>
  );
};

export default AddCategorieTagComponent;
