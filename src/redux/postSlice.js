import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  post: null,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPost: (state, action) => {
      const updatedPosts = state.post.map((post) => {
        if (post?._id === action.payload._id) {
          return action.payload;
        } else {
          return post;
        }
      });
      state.post = updatedPosts;
    },
    fetchSinglePost: (state) => {
      return state.post;
    },
    fetchPosts: (state, action) => {
      state.post = action.payload;
    },
    deletepost: (state, action) => {
      const filterPost = state.post.filter((post) => {
        post._id !== action.payload;
      });
      console.log(post._id, action.payload);
      // state.post = filterPost;
      console.log(filterPost);
    },
    likepost: (state, action) => {
      const likedPost = state.post.map((post) => {
        if (post?._id === action.payload._id) {
          return action.payload;
        } else {
          return post;
        }
      });

      console.log(likedPost);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPost, fetchSinglePost, fetchPosts, likepost, deletepost } =
  postSlice.actions;

export default postSlice.reducer;
