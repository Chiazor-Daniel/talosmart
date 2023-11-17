"use client";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import bg from '../../public/login.jpeg';
import { useLoginUserMutation, useRegisterUserMutation } from '../redux/authApi';
import { useAppDispatch } from '../hooks';
import { setUser } from '../redux/authSlice';
import Spinner from './spinner';

const Auth = ({ auth, check }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [user, setuser] = useState({
    username: 'jay@me.com',
    password: 'rerer',
  });
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [registerError, setRegisterError] = useState(null);

  const [loginUser] = useLoginUserMutation();
  const [registerUser] = useRegisterUserMutation();

  const handleAuth = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    if (user.username && user.password) {
      if (auth === 'register') {
        const resultRegister = await registerUser(user);
        setRegisterError(resultRegister.error);
      } else if (auth === "login") {
        const resultLogin = await loginUser(user);

        // Log the entire API response
        console.log("API Response:", resultLogin);

        // Check if the login result does not have an error
        if (!resultLogin.error) {
          // Assuming your API returns a message for successful login
          if (resultLogin.message === "Login Successful") {
            dispatch(setUser({ name: user.username }));
            router.push('/feed');
          }
        } else {
          // Log the error message if there's an error
          console.error("Login API Error:", resultLogin.error);
          setLoginError(resultLogin.error);
        }
      }
    } else {
      alert('Fill all input fields');
    }
  } catch (error) {
    console.error('API Error:', error);
    setLoginError(error); // Set the error state for login
  } finally {
    setLoading(false);
  }
};

  


  // useEffect(() => {
  //   // Handle successful registration
  //   if (registerError?.message === "Registration Successful") {
  //     router.push('/');
  //   }
  // }, [registerError]);

  return (
    <div className={`h-screen grid items-center`} style={{ background: `url(${bg.src})`, backgroundRepeat: 'no-repeat', objectFit: 'cover', backgroundSize: '100% 100%' }}>
      <form className='bg-white rounded-xl w-[70%] md:w-1/3 m-auto p-4 grid gap-4 py-6'>
        <h1 className='text-2xl text-center font-bold text-red-500'>{auth}</h1>
        {loginError && <p className='text-white bg-red-600 p-2 rounded-xl'>{loginError.message}</p>}
        {registerError && <p className='text-white bg-red-600 p-2 rounded-xl'>{registerError.message}</p>}
        <div className='grid gap-4 px-6'>
          <input
            onChange={(e) => setuser({ ...user, username: e.target.value })}
            value={user.username}
            type='text'
            placeholder='Username'
            className='bg-gray-200 text-gray-500 w-full rounded-full px-4 py-2 focus:outline-none'
            required
          />
          <input
            onChange={(e) => setuser({ ...user, password: e.target.value })}
            value={user.password}
            type='password'
            placeholder='Password'
            className='bg-gray-200 text-gray-500 w-full rounded-full px-4 py-2 focus:outline-none'
            required
          />
        </div>
        <button onClick={handleAuth} className='bg-red-500 w-1/2 m-auto text-white py-2 rounded-full '>
          {loading ? <Spinner /> : auth}
        </button>
        <div className='flex gap-2 m-auto'>
          <p className='text-gray-600'>{auth === 'register' ? 'Already have an account ?' : 'Don\'t have an account ?'}</p>
          <Link href={`/${check}`}>
            <p className='text-center text-blue-500 underline'>{check}</p>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Auth;
