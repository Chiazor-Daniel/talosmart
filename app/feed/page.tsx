"use client"
import Navbar from "../components/navbar";
import CreatePost from "../components/create-post";
import SinglePost from "../components/singlepost";
import { Provider } from "react-redux";
import { store } from "../store";
import Posts from "../components/posts";
import { useEffect, useState } from "react";
import { selectUserName } from '../redux/authSlice'
import { useAppSelector } from '../hooks';
import { useRouter } from "next/navigation";

export default function Feed() {
  const user = useAppSelector(selectUserName)
  const router = useRouter()
  
 
  useEffect(()=>{
    if(!user){
      router.push("/")
    }
  }, [user])

  return (
    <Provider store={store}>
      {
        user ? (
      <main className='bg-gray-200 h-screen flex flex-col items-center overflow-auto'>
        <Navbar />
          <CreatePost />
          {/* <Posts newpost={newPost}/> */}
          {/* <SinglePost /> */}

      </main>
        ) : (
          <div>NO</div>
        )
      }
    </Provider>
  )
}
