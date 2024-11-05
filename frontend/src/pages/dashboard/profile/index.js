import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditProfileForm from './EditProfileForm';
import { getAllUserDetail } from '../../../redux/auth/slice';
import { getUserProfileAsync, updateUserProfileAsync } from '../../../redux/profile';
import { getAllProfileDetail } from '../../../redux/profile/slice';
import { getAllBlogPosts } from '../../../redux/blog/slice';
import { uploadPresetForBlogAsync } from '../../../redux/blog';
import { getAllTranslateDetail } from '../../../redux/translation/slice';
import { formattedDate } from '../../../utils/common';
import { ConfigCloudnary } from '../../../utils/configs';
import { hasAccess } from '../../../utils/common';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(getAllUserDetail);
  const { profile } = useSelector(getAllProfileDetail);
  const { imageObj } = useSelector(getAllBlogPosts);
  const { translations } = useSelector(getAllTranslateDetail);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: ''
  });
  const [saveProfile, setSaveProfile] = useState(false);
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      const uploadImg = new FormData();
      uploadImg.append('file', files[0]);
      uploadImg.append('upload_preset', ConfigCloudnary?.preset);
      dispatch(uploadPresetForBlogAsync({ data: uploadImg }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateUserProfileAsync({
        data: {
          id: user?.id,
          username: formData?.username,
          img: imageObj?.secure_url,
          email: formData.email,
          password: formData.password
        },
        callback: handleCallback
      })
    );
  };

  const handleCallback = (success) => {
    if (success) {
      setFormData({
        email: '',
        password: '',
        username: ''
      });
      dispatch(getUserProfileAsync({ id: user?.id }));
      setSaveProfile(!saveProfile);
    }
  };

  useEffect(() => {
    dispatch(getUserProfileAsync({ id: user?.id }));
  }, [dispatch, user]);

  useEffect(() => {
    if (user) {
      setFormData({
        email: user?.email,
        username: user?.username
      });
    }
  }, [user, saveProfile]);

  return (
    <>
      <div className="flex">
        <div
          style={{ height: '100%' }}
          className="w-80 rounded bg-gray-50 px-6 pt-8 shadow-lg profile-show-page"
        >
          <img src={profile?.img} alt="chippz" className="mx-auto w-16 py-4" />
          <div className="flex flex-col justify-center items-center gap-2">
            <h4 className="font-semibold">{translations?.common?.profile}</h4>
            <p className="text-xs">{translations?.breadcrumb?.profile?.title}</p>
          </div>
          <div className="flex flex-col gap-3 border-b py-6 text-xs">
            <p className="flex justify-between">
              <span className="text-gray-400">{translations?.breadcrumb?.profile?.idNumber}</span>
              <span>#{profile?.id}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-400">{translations?.breadcrumb?.profile?.username}</span>
              <span>{profile?.username}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-400">
                {translations?.breadcrumb?.profile?.createdDate}
              </span>
              <span>{formattedDate(profile?.created_at)}</span>
            </p>
          </div>
          <div className="flex flex-col gap-3 pb-6 pt-2 text-xs">
            <div className="py-4 justify-center items-center flex flex-col gap-2">
              <p className="flex gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M21.3 12.23h-3.48c-.98 0-1.85.54-2.29 1.42l-.84 1.66c-.2.4-.6.65-1.04.65h-3.28c-.31 0-.75-.07-1.04-.65l-.84-1.65a2.567 2.567 0 0 0-2.29-1.42H2.7c-.39 0-.7.31-.7.7v3.26C2 19.83 4.18 22 7.82 22h8.38c3.43 0 5.54-1.88 5.8-5.22v-3.85c0-.38-.31-.7-.7-.7ZM12.75 2c0-.41-.34-.75-.75-.75s-.75.34-.75.75v2h1.5V2Z"
                    fill="#000"
                  ></path>
                  <path
                    d="M22 9.81v1.04a2.06 2.06 0 0 0-.7-.12h-3.48c-1.55 0-2.94.86-3.63 2.24l-.75 1.48h-2.86l-.75-1.47a4.026 4.026 0 0 0-3.63-2.25H2.7c-.24 0-.48.04-.7.12V9.81C2 6.17 4.17 4 7.81 4h3.44v3.19l-.72-.72a.754.754 0 0 0-1.06 0c-.29.29-.29.77 0 1.06l2 2c.01.01.02.01.02.02a.753.753 0 0 0 .51.2c.1 0 .19-.02.28-.06.09-.03.18-.09.25-.16l2-2c.29-.29.29-.77 0-1.06a.754.754 0 0 0-1.06 0l-.72.72V4h3.44C19.83 4 22 6.17 22 9.81Z"
                    fill="#000"
                  ></path>
                </svg>
                {profile?.email}
              </p>
            </div>
          </div>
        </div>
        {hasAccess({
          pageNumber: 1,
          access: user?.access,
          actionName: 'edit'
        }) && (
          <EditProfileForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            imageObj={imageObj}
            translations={translations}
          />
        )}
      </div>
    </>
  );
};

export default ProfilePage;
