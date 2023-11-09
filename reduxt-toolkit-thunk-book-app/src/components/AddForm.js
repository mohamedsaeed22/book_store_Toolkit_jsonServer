import React from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { insetBook } from "../store/bookSlice";
import { useSelector } from "react-redux";

const Addform = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  const title = useRef(null);
  const price = useRef(null);
  const description = useRef(null);

  const dispath = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      id: "",
      title: title.current.value,
      price: price.current.value,
      description: description.current.value,
    };
    dispath(insetBook(data));
    title.current.value = null;
    price.current.value = null;
    description.current.value = null;
  };
  return (
    <div className="row">
      <div className="col-6 offset-3 mt-3">
        <h2>Insert Book</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              ref={title}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              className="form-control"
              id="price"
              required
              ref={price}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Description">Description</label>
            <textarea
              ref={description}
              className="form-control"
              id="Description"
              rows="3"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!isLoggedIn}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addform;
