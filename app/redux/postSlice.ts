import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface PostsState {
  posts: Post[] |  null;
}

export interface Post {
  id: number;
  username: string;
  post: string;
}

const initialState: PostsState = {
  posts: null,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    addPost: (state, action: PayloadAction<Post>) => {
      state?.posts?.push(action.payload);
    },
  },
});

export const { setPosts, addPost } = postsSlice.actions;

export const selectPosts = (state: RootState) => state.posts;

export default postsSlice.reducer;
