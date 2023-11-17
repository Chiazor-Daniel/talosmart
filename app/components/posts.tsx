import React, { useEffect, useState } from "react";
import { useRetrievePostsByUserQuery } from "../redux/postsApi";
import { useAppSelector } from "../hooks";
import { selectPosts } from "../redux/postSlice";
import { selectUserName } from "../redux/authSlice";
import { setPosts } from '../redux/postSlice';
import { useAppDispatch } from "../hooks";

interface Post {
  id: number;
  base64str: string,
  username: string;
  post: string;
}

const Posts: React.FC = () => {
  const user = useAppSelector(selectUserName);
  const [userState, setUserState] = useState(user);

  useEffect(() => {
    const storedUserState = localStorage.getItem("userState");
    if (storedUserState) {
      setUserState(JSON.parse(storedUserState));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("userState", JSON.stringify(userState));
  }, [userState]);

  const { data, isLoading, refetch } = useRetrievePostsByUserQuery(userState.name || "james_hall@gmail.com");
  const [initialPosts, setInitialPosts] = useState<number>(10);
  const [post, setPost] = useState<Post[] | null>(null);
  const [remainingPosts, setRemainingPosts] = useState<number>(0);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data) {
      const reversedData = [...data.data].reverse();
      setPost(reversedData.slice(0, initialPosts));
      setRemainingPosts(reversedData.length - initialPosts);
    }
  }, [data, initialPosts]);

  const handleLoadMore = () => {
    setInitialPosts(initialPosts + remainingPosts);
  };

  return (
    <div className="w-full grid items-center">
      <button
        onClick={handleLoadMore}
        className="bg-red-500 text-white py-1 px-2 m-auto rounded-full mb-4"
        disabled={remainingPosts === 0}
      >
        View More {remainingPosts > 0 && remainingPosts}
      </button>
      <div className="flex flex-col gap-4">
        {post &&
          post.map((post, idx) => (
            <div key={idx} className="bg-white w-full px-4 py-2 rounded-xl">
              <div className="p-2">
                <p className="font-bold text-gray-700 text-sm">{post.username.split("@")[0]}</p>
                <p className="text-xs text-gray-300">{post.username}</p>
              </div>
              <p className="text-gray-900">{post.post}</p>
              {(post.base64str !== "test" && post.base64str !== null) && (
                <div
                  className="post-image"
                  style={{ backgroundImage: `url(${post.base64str})`, backgroundSize: "cover", height: "200px", width: "200px" }}
                />
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Posts;
