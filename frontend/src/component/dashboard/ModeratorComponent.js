import React, { useEffect, useState } from 'react';
import JsonView from 'react18-json-view';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDashboardDetail } from '../../redux/dashboard/slice';
import {
  fetchAllAdminsAsync,
  updateAccessUserAsync,
  updateAdminAccessAsync
} from '../../redux/dashboard';

const ModeratorAccessComponent = () => {
  const dispatch = useDispatch();
  const { allAdminUsers } = useSelector(getAllDashboardDetail);
  const [displayObj, setDisplayObj] = useState({});
  const [adminId, setAdminId] = useState(null);

  useEffect(() => {
    fetchApi();
  }, [dispatch]);

  const fetchApi = () => {
    dispatch(fetchAllAdminsAsync());
  };

  const handleEdit = (edit) => {
    dispatch(
      updateAdminAccessAsync({
        data: {
          id: adminId,
          access: edit?.src
        },
        callback: handleCallback
      })
    );
  };

  const handleCallback = (success, { data }) => {
    if (success) {
      dispatch(
        updateAccessUserAsync({
          message: {
            listen: 'updateAccess',
            id: adminId,
            user: data?.access,
            message:
              'Moderator access permissions have been updated. Review the changes for accuracy.'
          },
          callback: handleAdminCallback
        })
      );
    }
  };

  const handleAdminCallback = (success) => {
    if (success) {
      setDisplayObj({});
      setAdminId(null);
      fetchApi();
    }
  };

  const handleClick = (admin) => {
    setDisplayObj(JSON.parse(JSON.stringify(admin?.access)));
    setAdminId(admin?.id);
  };

  return (
    <>
      {Object.entries(displayObj).length === 0 && (
        <div className="flex bg-gray-50">
          <div className="w-full md:w-1/2 rounded-lg bg-white px-8 py-4 shadow-md">
            <div className="px-1 py-4">
              <h3 className="font-bold text-2xl font-sans">All admin</h3>
            </div>
            <ul className="grid grid-cols-4 gap-2 px-1">
              {allAdminUsers.length > 0 &&
                allAdminUsers.map((admin, index) => (
                  <li
                    onClick={() => handleClick(admin)}
                    key={index}
                    className="flex items-center flex-col"
                  >
                    <img
                      src={admin?.img}
                      alt={admin?.img}
                      className="rounded-full w-16 h-16 object-cover cursor-pointer"
                    />
                    <h5 className="font-semibold">{admin?.username}</h5>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
      {Object.entries(displayObj).length > 0 && (
        <div className="flex items-center justify-center">
          <div className="w-full px-10 py-8 bg-white rounded-lg shadow-xl">
            <div className="flex items-center justify-between p-5">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Current access control
              </h3>
            </div>
            <div className="p-10" style={{ borderTop: '1px solid #e7e7e7' }}>
              <div className="json-view-container">
                <JsonView src={displayObj} onChange={handleEdit} theme="default" editable />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModeratorAccessComponent;
