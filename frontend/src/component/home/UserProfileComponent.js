import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlogPosts } from '../../redux/blog/slice';
import { uploadPresetForBlogAsync } from '../../redux/blog';
import { getUserProfileAsync, updateUserProfileAsync } from '../../redux/profile';
import { getAllProfileDetail } from '../../redux/profile/slice';
import { getAllUserDetail, handleLogoutUser } from '../../redux/auth/slice';
import { logoutLoggedInUserAsync } from '../../redux/auth';
import { ConfigCloudnary } from '../../utils/configs';

const UserProfileComponent = () => {
  const dispatch = useDispatch();
  const { imageObj, loading: imageLoading } = useSelector(getAllBlogPosts);
  const { user } = useSelector(getAllUserDetail);
  const { profile, loading: profileLoading } = useSelector(getAllProfileDetail);
  const [callback, setCallback] = useState(false);
  const [username, setUserName] = useState(profile?.username || '');

  const loading = !imageLoading && !profileLoading ? false : true;

  useEffect(() => {
    dispatch(getUserProfileAsync({ id: user?.id }));
  }, [dispatch, user]);

  useEffect(() => {
    if (callback && Object.entries(imageObj).length > 0) {
      handleCallback();
      setCallback(false);
    }
  }, [callback, imageObj]);

  useEffect(() => {
    if (profile) {
      setUserName(profile?.username);
    }
  }, [profile]);

  const handleClick = () => {
    document.getElementById('upload').click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('upload_preset', ConfigCloudnary?.preset);
    dispatch(uploadPresetForBlogAsync({ data: formData }));
    setCallback(true);
  };

  const handleCallback = (type) => {
    dispatch(
      updateUserProfileAsync({
        data: {
          id: user?.id,
          username: type === 'update' ? username : profile?.username,
          img: type === 'update' ? profile?.img : imageObj?.secure_url
        },
        callback: handleCall
      })
    );
  };

  const handleCall = (success) => {
    if (success) {
      dispatch(getUserProfileAsync({ id: user?.id }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCallback('update');
  };

  const handleLogout = () => {
    dispatch(handleLogoutUser());
  };

  return (
    <div className="user-profile flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div
        style={{ transform: 'translate(0%, 0%)' }}
        className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      >
        <div className="flex flex-col items-center p-10">
          <h1 className="text-2xl font-bold text-black">Your profile</h1>
          <div className="row">
            <div className="small-12 medium-2 large-2 columns">
              <div className="circle">
                <img
                  style={{ width: '5rem', height: '5rem' }}
                  alt="user 1"
                  src={profile?.img}
                  className="relative inline-block h-12 w-12 rounded-full border-2 border-white object-cover object-center focus:z-10"
                />
              </div>
              <div className="p-image cursor-pointer" onClick={handleClick}>
                <i className="fa fa-camera upload-button"></i>
                <input
                  className="file-upload"
                  id="upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {profile?.username}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">{profile?.email}</span>
          <div className="flex mt-4 md:mt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              <button
                type="submit"
                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900"
              >
                Update
              </button>
              <button
                onClick={() =>
                  dispatch(logoutLoggedInUserAsync({ data: user, callback: handleLogout }))
                }
                type="button"
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                logout
              </button>
            </form>
          </div>
        </div>

        {loading && (
          <div
            role="status"
            className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
          >
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              ></path>
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              ></path>
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfileComponent;
