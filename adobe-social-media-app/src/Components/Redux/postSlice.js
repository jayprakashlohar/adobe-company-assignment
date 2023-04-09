import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const postSlice = createSlice({
  name: "post",
  initialState: {
    allPost: [],
  },
  isLoading: true,
  isError: false,

  reducers: {
    allData(state, action) {
      return {
        ...state,
        allPost: action.payload,
        isLoading: false,
        isError: false,
      };
    },
  },
});
export const { allData } = postSlice.actions;
export default postSlice.reducer;

export const fetchAllPost = () => async (dispatch) => {
  try {
    let res = await axios.get("http://localhost:8080/posts", {
      headers: { authorization: localStorage.getItem("token") },
    });

    dispatch(allData(res.data));
  } catch (err) {
    console.log(err);
  }
};


