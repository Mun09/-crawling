import React from "react";

const SearchForm = () => {
  return (
    <div className="form">
      <input type="text" className="form-text" />
      <button
        type="button"
        className="form-btn"
        onClick={() => {
          fetch("api/data")
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              console.log(data);
            });
        }}
      >
        search
      </button>
    </div>
  );
};

export default SearchForm;