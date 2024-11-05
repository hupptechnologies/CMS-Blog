import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faTrashArrowUp } from '@fortawesome/free-solid-svg-icons';
import UpdateModalComponent from '../UpdateModalComponent';
import { useDispatch, useSelector } from 'react-redux';
import { deactivateUserAsync, logoutAnyUserAsync } from '../../redux/dashboard';
import { getAllUserDetail } from '../../redux/auth/slice';
import { formattedDate } from '../../utils/common';
import { hasAccess } from '../../utils/common';
import { SINGOUT_SVG } from '../../assets/icon/svg';

const TableComponent = ({ userRole = 'user', rowData, translations, callAPI, setCallAPI }) => {
  const dispatch = useDispatch();
  const {
    user: { access }
  } = useSelector(getAllUserDetail);
  const [showModal, setShowModal] = useState(false);
  const [info, setInfo] = useState({
    color: '',
    type: '',
    id: ''
  });
  const columns = [
    {
      id: 1,
      title: ''
    },
    {
      id: 2,
      title: translations?.table?.name
    },
    {
      id: 3,
      title: translations?.table?.date
    },
    {
      id: 4,
      title: translations?.table?.role
    },
    {
      id: 5,
      title: translations?.table?.status
    },
    {
      id: 6,
      title: 'Action'
    }
  ];

  const handleLogut = (row, condition) => {
    if (row.status === 'active' && condition === 'logout') {
      setInfo({
        color: 'red-700',
        id: row?.id,
        type: 'logout'
      });
      setShowModal(!showModal);
    } else if (condition === 'other') {
      setInfo({
        color: row.status === 'banned' ? 'green-700' : 'red-700',
        id: row?.id,
        type: row.status === 'banned' ? 'restore' : 'banned'
      });
      setShowModal(!showModal);
    }
  };

  const handleLogoutAnyUserAPI = () => {
    dispatch(
      logoutAnyUserAsync({
        message: {
          listen: 'logout',
          user: info?.id,
          message: 'You logout by admin successfuly!'
        },
        callback: handleCallback
      })
    );
  };

  const handleConfirm = () => {
    if (info?.type === 'logout') {
      handleLogoutAnyUserAPI();
    } else {
      dispatch(
        deactivateUserAsync({
          userId: info?.id,
          type: info?.type === 'restore' ? 'bannned' : 'inactive',
          callback: handleDeactvateCallback
        })
      );
    }
  };

  const handleDeactvateCallback = (success) => {
    if (success) {
      handleLogoutAnyUserAPI();
    }
  };

  const handleCallback = (success) => {
    if (success) {
      setInfo({
        color: '',
        id: '',
        type: ''
      });
      setCallAPI(!callAPI);
      setShowModal(!showModal);
    }
  };

  const handleCondition = (role) => {
    if ((role === 'user' || role === 'admin') && userRole === 'moderator') {
      return true;
    } else if (role === 'user' && userRole === 'admin') {
      return true;
    } else {
      return false;
    }
  };

  const handleAccess = (actionName) => {
    if (access) {
      return hasAccess({ pageNumber: 2, access, actionName });
    }
  };

  return (
    <>
      <div className="users-table-page">
        <table className="min-w-full table-auto">
          <thead className="justify-between">
            <tr className="bg-gray-800">
              {columns?.length > 0 &&
                columns.map((col, index) => (
                  <th key={index} className="px-16 py-2" style={{ textAlign: 'justify' }}>
                    <span className="text-gray-300">{col.title}</span>
                  </th>
                ))}
            </tr>
          </thead>
          <tbody className="bg-gray-200">
            {rowData.length > 0 &&
              rowData.map((row, index) => (
                <tr key={index} className="bg-white border-4 border-gray-200">
                  <td className="px-16 py-2 flex flex-row">
                    <div className="relative">
                      <img className="w-10 h-10 rounded-full" src={row.img} alt={row.img} />
                      <span
                        className={`top-0 left-7 absolute  w-3.5 h-3.5 ${row.status === 'active' ? 'bg-green-400' : 'bg-red-400'} border-2 border-white dark:border-gray-800 rounded-full`}
                      ></span>
                    </div>
                  </td>
                  <td className="px-16 py-2">
                    <span className="text-center ml-2 font-semibold">{row.username}</span>
                  </td>
                  <td className="px-16 py-2">
                    <span>{formattedDate(row.created_at)}</span>
                  </td>
                  <td className="px-16 py-2">
                    <span>{row.role}</span>
                  </td>
                  <td className="px-16 py-2">
                    <span>
                      {row.status === 'active' && (
                        <span className="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                          Online
                        </span>
                      )}
                      {row?.status === 'banned' && (
                        <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                          {row.status}
                        </span>
                      )}
                      {row?.status === 'inactive' && (
                        <span className="bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                          Offline
                        </span>
                      )}
                    </span>
                  </td>
                  <td className="px-16 py-2 flex" style={{ gap: '0.5rem', alignItems: 'center' }}>
                    {row?.status === 'active' && handleCondition(row.role) && (
                      <span
                        className={`${handleAccess('logout') ? '' : 'hidden'}`}
                        onClick={() => handleLogut(row, 'logout')}
                        title="logout user"
                        style={{ gap: '10px', display: 'flex' }}
                        data-tooltip-id="signout-tooltip"
                      >
                        <span className="cursor-pointer">{SINGOUT_SVG}</span>
                      </span>
                    )}
                    {row?.status === 'banned' && handleCondition(row.role) ? (
                      <span
                        data-tooltip-id="restore-tooltip"
                        className={`${handleAccess('restore') ? '' : 'hidden'}`}
                      >
                        <FontAwesomeIcon
                          cursor="pointer"
                          onClick={() => handleLogut(row, 'other')}
                          icon={faTrashArrowUp}
                          color="green"
                        />
                      </span>
                    ) : (
                      handleCondition(row.role) && (
                        <span
                          data-tooltip-id="delete-tooltip"
                          className={`${handleAccess('delete') ? '' : 'hidden'}`}
                        >
                          <FontAwesomeIcon
                            cursor="pointer"
                            onClick={() => handleLogut(row, 'other')}
                            icon={faTrash}
                            color="red"
                          />
                        </span>
                      )
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <UpdateModalComponent
        showModal={showModal}
        handleClose={() => setShowModal(!showModal)}
        title={`${translations?.modal?.modalTitle} ${info.type}`}
        content={translations?.modal?.modalContent}
        hightlightText={info.id}
        info={info}
        handleSubmit={handleConfirm}
      />
    </>
  );
};

export default TableComponent;
