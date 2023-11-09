import React, { Fragment, useEffect } from "react";
import BookInfo from "./BookInfo";
import BooksList from "./BooksList";
import { getBooks } from "../../store/bookSlice";
import { useDispatch, useSelector } from "react-redux";
import "./book.css";
import { deleteBook } from './../../store/bookSlice';
import { useState } from "react";

const PostContainer = () => {
  const [selectedBook , setSelectedBook]=useState({})
  const { isLoggedIn } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const { books, isLoading } = useSelector((state) => state.books);
  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  const getBookId =(id)=>{
    // مينفعش ابعتها علطول للكومبونت لازم اشوف حاجه بتعمل ريريندر زى الاستيت
    const chosenBook = books.find(book => book.id === id);
      setSelectedBook((prev)=>{ return{...prev , ...chosenBook}})
  }
  return (
    <Fragment>
      <hr className="my-5" />
      <div className="row">
        <div className="col">
          <BooksList
            isLoading={isLoading}
            books={books}
            isLoggedIn={isLoggedIn}
            deleteBook={deleteBook}
            dispatch={dispatch}
            getBookId={getBookId}
          />
        </div>
        <div className="col side-line">
          <BookInfo info={selectedBook}/>
        </div>
      </div>
    </Fragment>
  );
};

export default PostContainer;
