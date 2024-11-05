import React from 'react';
import { Image } from 'cloudinary-react';
import { ConfigCloudnary } from '../../../utils/configs';

const InputComponent = ({
  label,
  name,
  type,
  placeholder,
  value,
  handleChange,
  required = false
}) => {
  return (
    <div className="w-full md:w-full px-3 mb-6">
      <label
        className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-gray-800"
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

const EditProfileForm = ({ formData, handleChange, handleSubmit, imageObj, translations }) => {
  return (
    <>
      <div className="w-full lg:w-1/3 m-1 profile-edit-page">
        <div className="flex justify-between p-3">
          <h4 className="text-xl font-bold text-navy-700 dark:text-white">
            {translations?.breadcrumb?.profile?.editProfile}
          </h4>
        </div>
        <form className="w-full bg-white shadow-md p-6" onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <InputComponent
              name={'username'}
              type={'text'}
              label={translations?.form?.username}
              value={formData.username || ''}
              handleChange={handleChange}
            />
            <InputComponent
              name={'password'}
              type={'text'}
              label={translations?.form?.password}
              placeholder={'add new password'}
              value={formData.password || ''}
              handleChange={handleChange}
            />
            <InputComponent
              name={'email'}
              type={'email'}
              label={translations?.form?.email}
              value={formData.email || ''}
              handleChange={handleChange}
            />
            <div className="w-full px-3 mb-8">
              <div className="mb-4">
                <label
                  className='w-64 flex flex-col items-center px-4 py-6 bg-white text-black rounded-lg shadow-lg tracking-wide uppercase border border-gray-500 hover:bg-gray-100 cursor-pointer'
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
                  <input type="file" className="hidden" onChange={handleChange} />
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
            </div>
            <div className="w-full md:w-full px-3 mb-6">
              <button className="block w-full bg-gray-900 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-gray-400">
                {translations?.common?.update} {translations?.common?.profile}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProfileForm;
