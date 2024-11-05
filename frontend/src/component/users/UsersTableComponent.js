import React, { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash.debounce';
import TableComponent from '../dashboard/TableComponent';
import DatePickerComponent from '../DatePickerComponent';
import DropdownComponent from '../DropdownComponent';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsersAsync } from '../../redux/profile';
import { getAllUserDetail } from '../../redux/auth/slice';
import { getAllProfileDetail } from '../../redux/profile/slice';
import { getAllTranslateDetail } from '../../redux/translation/slice';
import { hasAccess } from '../../utils/common';

const UsersTableComponent = ({ searchTerm }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(getAllUserDetail);
  const { users, loading, usersTypes, totalCount } = useSelector(getAllProfileDetail);
  const { translations } = useSelector(getAllTranslateDetail);
  const [callAPI, setCallAPI] = useState(false);
  const [selectedOption, setSelectedOption] = useState('All');
  const [date, setDate] = useState({});

  const debouncedFetchUsers = useCallback(
    debounce((term, date) => fetchUsers(term, date), 300),
    [selectedOption]
  );

  useEffect(() => {
    debouncedFetchUsers(searchTerm, date);
  }, [dispatch, user, searchTerm, callAPI, date, selectedOption]);

  const fetchUsers = (term, date) => {
    dispatch(
      getAllUsersAsync({
        type: selectedOption === 'All' ? '' : selectedOption,
        id: user?.id,
        search: term || '',
        startDate: date?.startDate?.toISOString() || '',
        endDate: date?.endDate?.toISOString() || ''
      })
    );
  };

  const handleChangeDate = (cdate) => {
    setDate(cdate);
  };

  const handleSelectChange = (ctype) => {
    setSelectedOption(ctype);
  };

  const handleAccess = (actionName) => {
    return hasAccess({ pageNumber: 2, access: user?.access, actionName });
  };

  return (
    <>
      <div className="mb-5 flex justify-between">
        {handleAccess('date') && <DatePickerComponent handleChangeDate={handleChangeDate} />}
        {handleAccess('select') && (
          <DropdownComponent
            data={usersTypes}
            total={totalCount}
            handleSelectChange={handleSelectChange}
            selectedOption={selectedOption}
          />
        )}
      </div>
      <TableComponent
        callAPI={callAPI}
        setCallAPI={setCallAPI}
        translations={translations}
        loading={loading}
        rowData={users || []}
        userRole={user?.role}
      />
    </>
  );
};

export default UsersTableComponent;
