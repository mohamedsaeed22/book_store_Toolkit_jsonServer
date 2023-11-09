import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { logInsert } from "./reportSlice";

export const getBooks = createAsyncThunk(
  "book/getBooks",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch("http://localhost:3005/books");
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const insetBook = createAsyncThunk(
  "book/insertBook",
  async (book, thunkAPI) => {

    const { rejectWithValue, getState, dispatch } = thunkAPI;

    //1-dispatch
    // dispatch to dispatch another action on another slice
    // like dispatc on component (send data)
    // can dispatch another createAsyncThunk
    // ex: => dispatch(deleteBook({id:5}))

    //2-getState
    // console.log(getState().auth.name);
    // getState can access any state in store like
    //{books: {…}, auth: {…}}
    // auth
    // {isLoggedIn: true, name: 'mohamedSaeed'}
    // books
    // {books: Array(6), isLoading: true, error: null}

    try {
      book.userName = getState().auth.name;
      // will delete book when i insert another book
      // this easy to dispatch another createAsyncThunk
      // dispatch(deleteBook({id:6}))
      const res = await fetch("http://localhost:3005/books", {
        method: "POST",
        body: JSON.stringify(book),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      const data = await res.json();
      dispatch(logInsert({ name: "insertBook", status: "success" }));
      return data;
    } catch (error) {
      dispatch(logInsert({ name: "insertBook", status: "failed" }));

      return rejectWithValue(error.message);
    }
  }
);

export const deleteBook = createAsyncThunk(
  "book/deleteBook",
  async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await fetch(`http://localhost:3005/books/${item.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      console.log(item);
      return item;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = { books: [], isLoading: false, error: null };
const bookSlice = createSlice({
  name: "book",
  initialState,
  // reducers: {},
  extraReducers: {
    // =================  getBooks ===========
    [getBooks.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [getBooks.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.books = action.payload;
    },
    [getBooks.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //================ insertBook ===============
    [insetBook.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [insetBook.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.books.push(action.payload);
    },
    [insetBook.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //=================== deleteBook =================
    [deleteBook.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [deleteBook.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.books = state.books.filter((el) => el.id !== action.payload.id);
    },
    [deleteBook.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default bookSlice.reducer;
