import { createSlice } from "@reduxjs/toolkit";

const apiSlice = createSlice({
  name: "api",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    fetchDataStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchDataFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } =
  apiSlice.actions;

export default apiSlice.reducer;

export const fetchData = (url) => async (dispatch) => {
  dispatch(fetchDataStart());
  try {
    const response = await fetch(url);
    const data = await response.json();
    dispatch(fetchDataSuccess(JSON.stringify(data)));
  } catch (error) {
    dispatch(fetchDataFailure(error.message));
  }
};
