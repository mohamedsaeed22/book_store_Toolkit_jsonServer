import React from "react";

const BooksList = ({
  isLoading,
  books,
  isLoggedIn,
  deleteBook,
  dispatch,
  getBookId,
}) => {
  const bookList =
    books.length > 0
      ? books.map((item) => {
          return (
            <li
              key={item.id}
              className="list-group-item d-flex  justify-content-between align-items-center"
            >
              <div>{item.title}</div>
              <div className="btn-group" role="group">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => getBookId(item.id)}
                >
                  Read
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  disabled={!isLoggedIn}
                  onClick={() =>
                    // if i need the response here at component
                    // not recommended to store response at global state
                    dispatch(deleteBook(item))
                      .unwrap()
                      .then((originalPromiseResult) => {
                        console.log(originalPromiseResult);
                      })
                      .catch((rejectedValueOrSerializedError) => {
                        console.log(rejectedValueOrSerializedError);
                      })
                  }
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })
      : "there is no books available";

  return (
    <div>
      <h2>Books List</h2>
      {isLoading ? "loading..." : <ul className="list-group">{bookList}</ul>}
    </div>
  );
};

export default BooksList;
