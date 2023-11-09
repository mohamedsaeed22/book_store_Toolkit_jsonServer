import React from "react";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { logInOut } from "../store/authSlice";

const Header = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.books);
  return (
    <Fragment>
      {error && (
        <div class="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand mb-0 h1">My Books</span>

        <button
          className="btn btn-outline-primary"
          type="submit"
          onClick={() => dispatch(logInOut())}
        >
          {isLoggedIn ? "Logout" : "Login"}
        </button>
      </nav>
    </Fragment>
  );
};

export default Header;
