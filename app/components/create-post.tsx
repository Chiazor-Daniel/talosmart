import React, { useState, ChangeEvent } from 'react';
import { CiImageOn } from 'react-icons/ci';
import Image from 'next/image';
import { useCreatePostWithImageMutation, useCreatePostMutation } from '../redux/postsApi';
import { useAppSelector } from '../hooks';
import { selectUserName } from '../redux/authSlice';
import ProfilePic from './profilepic';
import Posts from './posts';

interface CreatePostProps {

}

const CreatePost: React.FC<CreatePostProps> = () => {
  const user = useAppSelector(selectUserName);
  const [postText, setPostText] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string>(''); // Updated to an empty string for better typing
  const [createPostWithImage] = useCreatePostWithImageMutation();
  const [createPost] = useCreatePostMutation();

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPostText(e.target.value);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64str = reader.result as string;
      console.log("Base64 String:", base64str);
      setImageURL(base64str);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handlePost = async () => {
    try {
      if (!postText) {
        console.error('Please enter post text.');
        return;
      }

      let result;

      if (selectedFile) {
        const base64str = await convertFileToBase64(selectedFile);
        console.log("Base64 String:", base64str);

        result = await createPostWithImage({ username: user.name, base64str, post: postText });
      } else {
        result = await createPost({ username: user.name, post: postText });
      }

      console.log('Post created successfully:', result);

      setPostText('');
      setSelectedFile(null);
      setImageURL('');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };
  
  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="py-20 w-[90%] flex flex-col gap-6 md:w-1/2">
      <div className='bg-white h-auto rounded-xl'>
        <div className='flex bg-white rounded-xl p-4 gap-4 items-center'>
          <ProfilePic />
          <div className='flex-1 relative flex items-center h-full'>
            <div className='p-2 right-0 rounded-full text-2xl absolute text-gray-400 hover:bg-gray-300 cursor-pointer'>
              <div className='relative overflow-hidden'>
                <input type='file' onChange={handleFileChange} className='absolute opacity-0' />
                <CiImageOn />
              </div>
            </div>
            <input
              type='text'
              placeholder='Create Post'
              value={postText}
              onChange={handleTextChange}
              className='flex-1 py-3 h-full rounded-full focus:outline-none px-4 text-gray-500 bg-gray-200'
            />
          </div>
          <button onClick={handlePost} className='bg-primary px-4 py-2 rounded-full h-full text-white'>
            Post
          </button>
        </div>
        {imageURL && (
          <div className='p-4 flex items-center justify-center w-full'>
            <Image src={imageURL} alt='postimage' height={200} width={200} className='rounded' />
          </div>
        )}
      </div>
      <Posts />
    </div>
  );
};

export default CreatePost;
