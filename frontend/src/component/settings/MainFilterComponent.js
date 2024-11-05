import React, { useEffect, useState } from 'react';
import JsonView from 'react18-json-view';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTranslateDetail } from '../../redux/translation/slice';
import { updateTranslationAsync } from '../../redux/translation';
import { getAllTourStepDetail } from '../../redux/tourStep/slice';
import { getAllUserDetail } from '../../redux/auth/slice';
import { hasAccess } from '../../utils/common';

const MainFilterComponent = () => {
  const dispatch = useDispatch();
  const { translations } = useSelector(getAllTranslateDetail);
  const { tourStepsList } = useSelector(getAllTourStepDetail);
  const {
    user: { access }
  } = useSelector(getAllUserDetail);
  const [currentFilter, setCurrentFilter] = useState(0);
  const [updateTranslation, setUpdateTranslation] = useState({});
  const [updateTourSteps, setUpdateTourSteps] = useState([]);

  useEffect(() => {
    if (translations) {
      setUpdateTranslation(JSON.parse(JSON.stringify(translations)));
    }
  }, [translations]);

  useEffect(() => {
    if (tourStepsList.length !== 0) {
      setUpdateTourSteps(JSON.parse(JSON.stringify(tourStepsList)));
    }
  }, [tourStepsList]);

  const handleEdit = (edit) => {
    if (currentFilter === 0) {
      dispatch(
        updateTranslationAsync({
          data: {
            language: localStorage.getItem('lan'),
            translations: edit?.src
          },
          callback: handleCallback
        })
      );
    }
  };

  const handleCallback = (success) => {
    if (success) {
      setUpdateTranslation(translations);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center py-4 md:py-8 flex-wrap">
        <button
          onClick={() => setCurrentFilter(0)}
          type="button"
          className={`text-gray-700 hover:text-white border border-gray-600 hover:bg-gray-700 focus:outline-none rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 ${currentFilter === 0 && 'bg-gray-700 text-white'}`}
        >
          Launguage
        </button>
        <button
          onClick={() => setCurrentFilter(1)}
          type="button"
          className={`text-gray-700 hover:text-white border border-gray-600 hover:bg-gray-700 focus:outline-none rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 ${currentFilter === 1 && 'bg-gray-700 text-white'}`}
        >
          Guide steps
        </button>
      </div>
      <div className="flex items-center justify-center">
        <div className="w-full px-10 py-8 bg-white rounded-lg shadow-xl">
          <div className="flex items-center justify-between p-5">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Current translation</h3>
          </div>
          <div className="p-10" style={{ borderTop: '1px solid #e7e7e7' }}>
            <div className="json-view-container">
              <JsonView
                src={currentFilter === 0 ? updateTranslation : updateTourSteps}
                onChange={handleEdit}
                theme="default"
                editable={
                  currentFilter === 0
                    ? hasAccess({ pageNumber: 7, actionName: 'language', access })
                      ? true
                      : false
                    : false
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainFilterComponent;
