import React from 'react';
import ProfilePic from './profilepic';
import { LuFlower2 } from "react-icons/lu";
import { selectUserName } from '../redux/authSlice'
// import {useSelector} from "react-redux"
import { useAppSelector } from '../hooks';
import { useRouter } from "next/navigation";

const Navbar = () => {
  const user = useAppSelector(selectUserName)
  const router = useRouter();

  return (
    <div className='fixed top-0 bg-white w-full items-center py-2 flex justify-around z-20'>
      <div className='flex gap-2 items-center'>
        <LuFlower2 className="text-red-200 text-xl"/>
      <h2 className='text-primary text-2xl font-bold'>
        Stems
        {/* {user.name} */}
      </h2>
      </div>
      <div className="flex gap-4">
      <ProfilePic />
      <button onClick={()=> router.push("/") } className='bg-red-500 py-2 rounded-full text-white px-4'>
        Logout
      </button>

      </div>
    </div>
  );
};

export default Navbar;
