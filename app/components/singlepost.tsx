import React from "react";
import ProfilePic from "./profilepic";
import Image from "next/image";
import { HiDotsHorizontal } from "react-icons/hi";
import food from "../../public/food.jpeg"
import { FaHeart } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
const SinglePost = () => {
    const postPicStyle = {
        backgroundImage: `url(${food.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '15px',
        width: '100%',
        height: '400px',
      };
  return (
    <div className="bg-white rounded-xl p-4 flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <ProfilePic />
          <div>
            <p className="text-gray-800 font-semibold">Amanda Walls</p>
            <p className="text-gray-300">@Amanda</p>
          </div>
        </div>
        <div className="text-gray-500 cursor-pointer rounded-full p-2 hover:bg-gray-300">
          <HiDotsHorizontal />
        </div>
      </div>
      <p className="text-md text-gray-500">My Special Dish 🚀🚀😁😁😁</p>
      <div>
      <div style={postPicStyle}></div>
      <div className="flex p-4 gap-4">
        <FaHeart className="text-gray-300 cursor-pointer focus:text-red-500 hover:text-red-500 text-2xl"/>
        <FaComment className="text-gray-300 cursor-pointer hover:text-gray-500 text-2xl"/>
      </div>
      </div>
    </div>
  );
};

export default SinglePost;
