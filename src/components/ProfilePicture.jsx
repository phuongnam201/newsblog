import React from "react";
import { stables } from "../constants";
import { HiOutlineCamera } from "react-icons/hi";

const ProfilePicture = ({ avatar }) => {
  return (
    <div className="w-full flex items-center gap-x-4">
      <div className="relative w-28 h-28 rounded-full outline outline-offset-2 outline-1 outline-primary overflow-hidden mb-5 mr-5">
        <label
          htmlFor="profilePicture"
          className="cursor-pointer absolute inset-0 rounded-full bg-transparent"
        >
          {avatar ? (
            <img
              src={stables.UPLOADS_FOLDER_BASE_URL + avatar}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-blue-50/50 flex justify-center items-center">
              <HiOutlineCamera className="w-7 h-auto text-primary" />
            </div>
          )}
        </label>
        <input type="file" className="sr-only" id="profilePicture" />
      </div>
      <button
        type="button"
        className="border border-red-500 rounded-lg px-4 py-2 text-red-500 "
      >
        Delete image
      </button>
    </div>
  );
};

export default ProfilePicture;
